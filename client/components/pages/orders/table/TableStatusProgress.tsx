import { useTranslations } from "next-intl"
import { useState } from "react"
import styled from "styled-components"
import $api from "../../../../http/api-manipulation"
import { media, FlexCenter, FlexOnlyCenter } from "../../../../styles/style-variables"
import { TableBtnPhone } from "./buttons/TableStatusBtnPhone"
import { StarGenerate } from "./StarGenerate"
import { mutate } from "swr"
const TableStatusProgressS = styled.div`
  p {
    margin-top: 8px;
  }
  ${media.mobile} {
    border-top: 1px solid #e2e2e2;
    margin: 20px -16px 0px;
    padding: 16px 16px 0px;
    p {
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 17px;
    }
  }
`

const ProgressBarHidden = styled.div`
  position: absolute;
  top: -12px;
  background: black;
  transform: translateY(-100%) scale(0);
  font-weight: 500;
  font-size: 16px;
  transform-origin: bottom center;
  line-height: 24px;
  padding: 8px 11px;
  background: #132926;
  border-radius: var(--default-border-radius);
  color: white;
  transition: var(--default-transition) linear;
  opacity: 0;
  visibility: hidden;
  :before {
    content: "ㅤㅤㅤ";
  }
`

const ProgressBar = styled.div<{ status?: any; local1?: any; local2?: any; local3?: any }>`
  display: flex;
  gap: 1px;
  margin-top: 8px;
  position: relative;
  width: 70%;
  span {
    height: 8px;
    width: 100%;
    background: #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    transition: var(--default-transition) linear;
    :hover {
      border: 1px solid black;
      filter: brightness(0.9);
    }
    ${({ status }) => status === 2 && ":first-child {background: #428FD7; width: 150%;}"}
    ${({ status }) =>
      status === 3 &&
      ":first-child {background: #29BC26;} :nth-child(2) {background: #FFAB2E; width: 150%;}"}
    ${({ status }) =>
      status === 4 &&
      ":not(:last-child) {background: #29BC26;} :nth-child(3){background: #966FE9; width: 150%;}"}
      :hover ~ ${ProgressBarHidden} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-100%) scale(1);
    }
    :nth-child(1):hover ~ ${ProgressBarHidden}:before {
      content: "${({ local1 }) => local1}";
    }
    :nth-child(2):hover ~ ${ProgressBarHidden}:before {
      content: "${({ local2 }) => local2}";
    }
    :nth-child(3):hover ~ ${ProgressBarHidden}:before {
      content: "${({ local3 }) => local3}";
    }
  }
  ${media.mobile} {
    gap: 2px;
    width: 100%;
    span {
      height: 12px;
    }
  }
`

const RaitingBox = styled(FlexCenter)`
  gap: 4px;
  p {
    margin: 0px 8px 0px 0px;
  }
  ${media.mobile} {
    justify-content: space-between;
  }
`

export const TableStatusProgress = ({ isMobile, data, completed }) => {
  const t = useTranslations("Table")
  const statusText = () => {
    // if (data.status === "paid") return "Отклонить";
    // if (data.status === "assembled") return "На Доставку";
    // if (data.status === "delivery") return "Завершить";

    return data.status_id === 2 ? t("Btn1") : data.status_id === 3 ? t("Btn2") : t("Btn3")
  }
  let pageAmount = isMobile ? 5 : 10

  const progressBtnClick = (n) => (e) => {
    mutate(
      `order/company/list?status_id=1&page=1&per_page=${pageAmount}&sort[create_datetime]=DESC`,
      $api
        .patch(`order/${data.id}/status`, {
          status_id: n,
        })
        .then((resp) => console.log(resp)),
      {
        populateCache: (updateList, list) => {
          return { ...list }
        },
        // revalidate: false,
      }
    )
  }

  return (
    <TableStatusProgressS>
      {completed ? (
        <>
          <ProgressBar
            local3={t("Progres3")}
            local2={t("Progres2")}
            local1={t("Progress1")}
            status={data.status_id}
          >
            <span onClick={progressBtnClick(2)}></span>
            <span onClick={progressBtnClick(3)}></span>
            <span onClick={progressBtnClick(4)}></span>
            <ProgressBarHidden></ProgressBarHidden>
          </ProgressBar>
          <p>
            {isMobile && <>{t("HeaderText6")}:&nbsp;</>}

            {statusText()}
          </p>
        </>
      ) : (
        <RaitingBox>
          <FlexOnlyCenter>
            <p>{!isMobile ? data?.rating : t("HeaderText7")}</p>
            {StarGenerate(data, isMobile)}
          </FlexOnlyCenter>
          {isMobile && !completed && (
            <TableBtnPhone phoneSender={data.sender_phone} phoneRecipient={data.recipient_phone} />
          )}
        </RaitingBox>
      )}
    </TableStatusProgressS>
  )
}
