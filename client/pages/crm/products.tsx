import { useEffect, useState } from "react"
import styled from "styled-components"
import { Tab } from "../../components/UI-kit/tab"
import { Gap } from "./orders"
import { JC_SB, media } from "../../styles/style-variables"
import { ProductItem } from "../../components/pages/products/ProductItem"
import Head from "next/head"
import { AddBtnUI } from "../../components/UI-kit/buttonsU"
import { PopUp } from "../../components/common/pop-up"
import { ProductPopUp } from "../../components/pages/products/pop-up/PorductPopUp"
import { ProductPopUpOption } from "../../components/pages/products/pop-up/ProductPopUpOption"
import { DeletePopUp } from "../../components/pages/products/pop-up/DeletePopUp"
import { TogglePopUpF } from "../../components/pages/products/pop-up/PopUpLogic"
import { HeaderTabItem } from "../../components/pages/products/HeaderTabItem"
import { useTabChange } from "../../components/common/hooks/useTabChange"
import { useTranslations } from "next-intl"
import { GetStaticPropsContext } from "next"
import { getProduct } from "../../http/ProductsService"
import { useDispatch } from "react-redux"
import { editingFalse, editingTrue } from "../../store/slices/productsPopUp"
import { useProductData } from "../../store/hooks/useProductData"
import bagPopUp, { showBag } from "../../store/slices/bagPopUp"

const HeaderTab = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  ${media.mobile} {
    gap: 16px;
    margin-bottom: 12px;
  }
`

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
  ${media.mobile} {
    padding: 24px 0px;
  }
  ${JC_SB} {
    ${media.mobile} {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
  }
`

const Content = styled.div`
  display: grid;
  border-radius: var(--default-border-radius);
  overflow: hidden;
  grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
  ${media.mobile} {
    grid-template-columns: 1fr 1fr;
    border-radius: unset;
  }
`

const MobilePadding = styled.div`
  ${media.mobile} {
    padding: 0px 16px;
  }
`

const DeletePopUpClose = `
top: -13px;
right: 3px;
`

export default function Products() {
  const data = useProductData()
  const dispatch = useDispatch()
  const t = useTranslations("Products")
  const [headerTabActive, SetheaderTabActive] = useState(t("HeaderTab1"))

  let checkHeaderTab = headerTabActive === t("HeaderTab1")

  let [productActiveData, productCompletedData, productActiveData1, productCompletedData2] = data

  checkHeaderTab
    ? ([productActiveData1, productCompletedData2] = [productActiveData, productCompletedData])
    : ([productActiveData, productCompletedData] = [productActiveData1, productCompletedData2])

  // Логика табов
  const [activeTab, changeItemsData, SetActiveTab, checkActiveTab, SetItemsData] = useTabChange(
    t("Tab1"),
    productActiveData,
    productCompletedData,
    headerTabActive,
    data
  )

  const [test, setTest] = useState(1)
  useEffect(() => {
    checkHeaderTab ? setTest(1) : setTest(2)
  }, [headerTabActive])

  const redBtnClick = () => {
    checkHeaderTab ? setTest(1) : setTest(2)
    dispatch(showBag({}))
    dispatch(editingFalse())
  }

  return (
    <>
      <Head>
        <title>Мои Товары | Bashmak shop</title>
      </Head>
      <Wrapper>
        <MobilePadding>
          <HeaderTab>
            <HeaderTabItem
              SetActiveTab={SetheaderTabActive}
              isActive={headerTabActive}
              text={t("HeaderTab1")}
            />
            <HeaderTabItem
              SetActiveTab={SetheaderTabActive}
              isActive={headerTabActive}
              text={t("HeaderTab2")}
            />
          </HeaderTab>
          <JC_SB>
            <Gap>
              <Tab
                SetActiveTab={SetActiveTab}
                isActive={activeTab}
                text={t("Tab1")}
                count={productActiveData?.length}
              ></Tab>
              <Tab
                SetActiveTab={SetActiveTab}
                isActive={activeTab}
                text={t("Tab2")}
                count={productCompletedData?.length}
              />
            </Gap>
            <AddBtnUI
              popUpContent={checkHeaderTab ? "ProductPopUp" : "ProductPopUpOption"}
              handleClick={redBtnClick}
              text={checkHeaderTab ? t("BtnAdd1") : t("BtnAdd2")}
            />
          </JC_SB>
        </MobilePadding>
        <Content>
          {changeItemsData?.map((item, key) => {
            return (
              <ProductItem
                checkSubTab={checkActiveTab}
                checkHeaderTab={checkHeaderTab}
                completed={true}
                data={item}
                key={item.id}
                TogglePopUp={setTest}
              />
            )
          })}
        </Content>
      </Wrapper>

      <PopUp customStyle={test === 3 && DeletePopUpClose} mobileCenter={test === 3}>
        {test === 1 ? (
          <ProductPopUp />
        ) : test !== 2 ? (
          <DeletePopUp text={checkHeaderTab ? t("PopUpText1") : t("PopUpText2")} />
        ) : (
          <ProductPopUpOption />
        )}
      </PopUp>
    </>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      locales: (await import(`../../locales/${locale}.json`)).default,
    },
  }
}
