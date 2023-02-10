import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { NoteSvg, FolderSvg } from "../../components/all-svg"
import { PopUp } from "../../components/common/pop-up"

import { BagPopUp } from "../../components/pages/orders/table/BagPopUp"

import { AccardionBtnHover, DataBtn } from "../../components/pages/orders/AccardionBtn"
import { CalculateTotalSum } from "../../components/pages/orders/table/CalculateSum"

import { TableHeader } from "../../components/pages/orders/table/table-header"
import { TableItem } from "../../components/pages/orders/table/table-item"
import { Tab } from "../../components/UI-kit/tab"
import { useDevice } from "../../store/hooks/useDevice"
import { media, FlexCenter, JC_SB, CustomScrollText } from "../../styles/style-variables"
import { useTabChange } from "../../components/common/hooks/useTabChange"
import { getOrderList } from "../../http/Service"
import { FormatSum } from "../../components/common/utils/FormatSum"
import { useBag } from "../../store/hooks/useBag"
import { Pagination } from "../../components/pages/orders/table/Pagination"
import $api from "../../http/api-manipulation"
import { useTranslations } from "next-intl"
import { GetStaticPropsContext } from "next"
import useSWR from "swr"
import { SWRfetch } from "../../http/SWRfetch"
import { useOrders } from "../../store/hooks/useOrders"
import { ChatPopUp } from "../../components/pages/orders/chat/ChatPopUp"
import { downloadFile } from "../../components/common/utils/downloadFile"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  h1 {
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
    color: white;
    font-family: ProximaNova;
  }
  ${media.mobile} {
    gap: 16px;
    padding: 28px 16px;
    h1 {
      font-size: 32px;
      line-height: 40px;
    }
  }
`

export const Gap = styled.div`
  display: flex;
  gap: 16px;
  ${media.mobile} {
    gap: 8px;
  }
`

const ExportBtn = styled(FlexCenter)`
  background: var(--default-red);
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 16px;
  line-height: 24px;
  gap: 8px;
  border-radius: 12px;
  transition: var(--default-transition) linear;
  :hover {
    filter: brightness(0.9);
  }
`

// Table

export const TableWrapper = styled.div`
  padding: 16px 12px;
  ${media.notMobile} {
    height: 75vh;
    border-radius: 16px;
    background: #e9e9e9;
  }
  overflow-y: scroll;

  ${CustomScrollText}
  ::-webkit-scrollbar-track {
    margin-top: 32px;
    margin-bottom: 10px;
  }
  ${media.mobile} {
    padding: 16px;
  }
`
export default function Orders() {
  const { openChat } = useOrders()
  const t = useTranslations("Orders")
  const { isMobile, width } = useDevice()
  let pageAmount = isMobile ? 5 : 10

  const tableWrapper = useRef<any>(null)
  const { data: firstTab } = useSWR(
    `order/company/list?status_id=1&page=1&per_page=${pageAmount}&sort[create_datetime]=DESC`,
    SWRfetch("get"),
    {
      revalidateOnFocus: false,
    }
  )
  const { data: secoundTab } = useSWR(
    `order/company/list?status_id=2&page=1&per_page=${pageAmount}&sort[create_datetime]=DESC`,
    SWRfetch("get")
  )

  console.log(firstTab, secoundTab)
  let [ordersActiveData, ordersCompletedData] = [firstTab, secoundTab]
  // Логика табов

  const [activeTab, changeItemsData, SetActiveTab, checkActiveTab, SetItemsData] = useTabChange(
    t("Tab1"),
    ordersActiveData,
    ordersCompletedData,
    firstTab,
    null,
    tableWrapper
  )

  const totalSum = CalculateTotalSum(changeItemsData)

  const { id } = useBag()
  const [bagContent, setbagContent] = useState()

  useEffect(() => {
    if (changeItemsData && id) {
      let searchId = changeItemsData.results.find((item) => item.id === id)
      setbagContent(searchId?.products)
    }
  }, [id])

  const paginationClick = (e) => {
    const indexBtn = e.target.innerHTML
    let changeStatus = checkActiveTab ? 1 : 2
    let pageAmount = isMobile ? 5 : 10
    $api
      .get(
        `order/company/list?status_id=${changeStatus}&page=${indexBtn}&per_page=${pageAmount}&sort[create_datetime]=DESC`
      )
      .then((resp) => {
        SetItemsData(resp.data)
        tableWrapper.current.scrollTop = 0
        if (isMobile) window.scrollTo(0, 0)
      })
  }

  return (
    <>
      <Head>
        <title>{t("Title")} | Bashmak shop</title>
      </Head>
      <Content>
        <h1>{t("Title")} </h1>
        <JC_SB>
          <Gap>
            <Tab SetActiveTab={SetActiveTab} isActive={activeTab} text={t("Tab1")} />
            <Tab
              handleClick={() => {
                $api
                  .get(
                    `order/company/list?status_id=2&page=1&per_page=${pageAmount}&sort[create_datetime]=DESC`
                  )
                  .then((resp) => {
                    SetItemsData(resp.data)
                    tableWrapper.current.scrollTop = 0
                    if (isMobile) window.scrollTo(0, 0)
                  })
              }}
              SetActiveTab={SetActiveTab}
              isActive={activeTab}
              text={t("Tab2")}
            />
          </Gap>
          {!isMobile && (
            <Gap>
              <DataBtn
                svg={<NoteSvg />}
                formatDate={"dd.MM.yyyy"}
                btnStyle={AccardionBtnHover}
                text={t("For")}
              />
              {/* {checkActiveTab && <StatusBtns handleClick={statusBtnClick} text={"Все статусы"} />} */}
              <ExportBtn
                onClick={() => {
                  downloadFile(
                    "Base_orders.xlsx",
                    "order/company/list/export?format=excel&date=2022-12-02&status_id=1"
                  )
                }}
                as="button"
              >
                <FolderSvg />
                {t("ExportBtn")}
              </ExportBtn>
            </Gap>
          )}
        </JC_SB>
        <TableWrapper ref={tableWrapper}>
          {!isMobile && <TableHeader checkActiveTab={checkActiveTab} sum={FormatSum(totalSum)} />}
          {changeItemsData?.results.map((item, index) => {
            return (
              <TableItem isMobile={isMobile} key={item.id} data={item} completed={checkActiveTab} />
            )
          })}
        </TableWrapper>
        <PopUp maxWidth={"328px"}>
          <BagPopUp data={bagContent} />
        </PopUp>
        <Pagination
          paginationClick={paginationClick}
          activeTab={activeTab}
          data={changeItemsData}
        />
      </Content>
      {openChat && <ChatPopUp />}
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
