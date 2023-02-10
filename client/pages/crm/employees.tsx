import { GetStaticPropsContext } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { PopUp } from "../../components/common/pop-up"
import { EmployessPopUp } from "../../components/pages/employees/EmployeesPopUp"
import { TableItem } from "../../components/pages/employees/TableItem"
import { TableHeaderS } from "../../components/pages/orders/table/table-header"
import { DeletePopUp } from "../../components/pages/products/pop-up/DeletePopUp"
import useSWR from "swr"
import { AddBtnUI } from "../../components/UI-kit/buttonsU"
import { employeesApi } from "../../fakeapi/api"
import $api from "../../http/api-manipulation"
import { useDevice } from "../../store/hooks/useDevice"
import { JC_SB, media } from "../../styles/style-variables"
import { TableWrapper } from "./orders"
import { SWRfetch } from "../../http/SWRfetch"
import { Pagination } from "../../components/pages/orders/table/Pagination"
import { useDispatch } from "react-redux"
import { showBag } from "../../store/slices/bagPopUp"


const Wrapper = styled.div`
  color: white;

  ${media.mobile} {
    padding: 24px 12px;
  }
`

const TableContent = styled.div`
  margin-top: 32px;
  ${media.mobile} {
    margin-top: 24px;
  }
`

export const TableGrid = styled.div`
  grid-template-columns: repeat(3, minmax(190px, 240px));
  display: grid;
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`

const TableHeader = styled(TableHeaderS)`
  margin-bottom: 8px;
`

const TableWrapperS = styled(TableWrapper)`
  ${media.mobile} {
    background: transparent;
    padding: unset;
    height: unset;
  }
`

const Header = styled(JC_SB)`
  h1 {
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
    font-family: ProximaNova;
  }
  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    h1 {
      margin-bottom: 20px;
    }
  }
`

const PopUpCloseCustomStyle = `
top: -14px;
right: 6px;
`

const TableItemsList = styled.div``

export default function Employees() {
  const { data } = useSWR(
    `employee/list?page=1&per_page=10`,
    SWRfetch("get"),
    {
      revalidateOnFocus: false,
    }
  )
  const dispatch = useDispatch()
  const t = useTranslations("Employees")
  const { isMobile } = useDevice()

  const [popUpContent, SetPopUpContent] = useState(false)

  console.log(data)

  return (
    <>
      <Head>
        <title>{t("Title")} | Bashmak shop</title>
      </Head>
      <Wrapper>
        <Header>
          <h1>{t("Title")}</h1>
          <AddBtnUI
            handleClick={() => {
              SetPopUpContent(false)
              dispatch(showBag({}))
            }}
            text={t("Text1")}
          />
        </Header>
        <TableContent>
          <TableWrapperS>
            {!isMobile && (
              <TableHeader>
                <TableGrid>
                  <p>{t("Text2")}</p> <p>{t("Text3")}</p> <p>{t("Text4")}</p>
                </TableGrid>
              </TableHeader>
            )}
            <TableItemsList>
              {data?.results?.map((item, index) => {
                return (
                  <TableItem
                    trashClick={() => {
                      SetPopUpContent(true)
                      dispatch(showBag({ section: "employees", id: item.id }))
                    }}
                    isMobile={isMobile}
                    key={item.id}
                    data={item}
                  />
                )
              })}
            </TableItemsList>
          </TableWrapperS>
          <Pagination paginationClick={() => {}} data={data}></Pagination>
        </TableContent>
        <PopUp customStyle={PopUpCloseCustomStyle} mobileCenter={true} maxWidth={"460px"}>
          {popUpContent ? (
            <DeletePopUp text={t("Text5")} />
          ) : (
            <EmployessPopUp isMobile={isMobile} />
          )}
        </PopUp>
      </Wrapper>
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
