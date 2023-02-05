import axios from "axios"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import styled from "styled-components"
import $api from "../../../http/api-manipulation"
import { media } from "../../../styles/style-variables"
import { downloadFile } from "../../common/utils/downloadFile"
import { AuthBtnUI } from "../../UI-kit/buttonsU"

const ContentTextS = styled.div`
  color: white;
  min-width: 402px;
  h1 {
    font-weight: 600;
    font-size: clamp(2rem, 1.273rem + 3.64vw, 4rem);
    line-height: clamp(2.5rem, 1.773rem + 3.64vw, 4.5rem);
  }

  button {
    color: white;
    width: fit-content;
    padding: 20px 35px;
  }
  ${media.mobile} {
    width: 100%;
    min-width: unset;
    h1 {
      text-align: center;
    }
    button {
      background: unset;
      padding: unset;
      margin-top: 5px;
      text-decoration: underline;
      margin-left: 12px;
    }
  }
`

export const ContentText = () => {
  const t = useTranslations("SelectCity")
  const [data, setData] = useState<any>()
  useEffect(() => {
    $api.get("analytics/public/company").then((resp) => {
      setData(resp.data)
      console.log(resp.data)
    })
  }, [])

  return (
    <>
      <ContentTextS>
        <h1>
          {data?.orders_quantity} {t("Title")} {data?.cities_quantity} {t("SubTitle")}
        </h1>

        <AuthBtnUI
          onClick={() => {
            downloadFile("Base.xlsx", "analytics/order/export")
          }}
          text={"Выгрузить базу"}
        />
        {/* <ul>
          <li>
            <b>2 353</b>Проданных букета
          </li>
          <li>
            <b>2 353</b>Проданных букета
          </li>
          <li>
            <b>2 353</b>Проданных букета
          </li>
        </ul> */}
      </ContentTextS>
    </>
  )
}
