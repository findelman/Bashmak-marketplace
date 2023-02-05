import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import styled from "styled-components"
import $api from "../../../../../http/api-manipulation"
import { FlexOnlyCenter, media } from "../../../../../styles/style-variables"
import { MessageSvg, BagSvg } from "../../../../all-svg"
import { TableStatusBtnBag } from "./TableStatusBtnBag"
import { TableBtnPhone, TableStatusBtnCircle } from "./TableStatusBtnPhone"
import { mutate } from "swr"
import { useDispatch } from "react-redux"
import { openChat } from "../../../../../store/slices/orders"
const TableStatusButtons = styled.div<{ gridConfig?: any }>`
  display: flex;
  gap: 12px;
  flex-flow: wrap;
  justify-content: flex-end;
  ${media.mobile} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    button {
      width: fit-content;
      /* Телефон */
      :nth-child(${({ gridConfig }) => (gridConfig ? 3 : 1)}) {
        grid-row: 1 / 1;
        grid-column: 2 /2;
        justify-self: flex-end;
      }
      /* Чат с клиентом */
      :nth-child(${({ gridConfig }) => (gridConfig ? 2 : 1)}) {
        justify-content: flex-start;
        grid-column: 1 / 3;
        width: 100%;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: var(--default-red);
        border: unset;
        padding: 14px 0px;
        border-radius: unset;
        margin-top: 10px;
        position: relative;
        :before,
        :after {
          content: "";
          position: absolute;
          width: calc(100% + 32px);
          height: 0.5px;
          left: -16px;
          top: 0;
          background: #e2e2e2;
        }
        :after {
          top: unset;
          bottom: -1px;
        }
        svg {
          margin-right: 8px;
          path {
            stroke: var(--default-red);
          }
        }
      }
    }
  }
`

const TableStatusBtn = styled.button`
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--default-red);
  border: 1px solid var(--default-red);
  border-radius: 12px;
  transition: var(--default-transition) linear;
  :hover {
    background: var(--default-red);
    color: white;
  }
`

export const TableStatusButtonS = ({ data, completed, isMobile }) => {
  const dispatch = useDispatch()
  let pageAmount = isMobile ? 5 : 10
  const t = useTranslations("Table")
  const statusBtnText = () => {
    // if (data.status === "paid") return "Отклонить";
    // if (data.status === "assembled") return "На Доставку";
    // if (data.status === "delivery") return "Завершить";

    return data.status_id === 2
      ? t("ClickBtn1")
      : data.status_id === 3
      ? t("ClickBtn2")
      : t("ClickBtn3")
  }

  return (
    <TableStatusButtons gridConfig={completed}>
      {completed && (
        <TableStatusBtn
          onClick={() => {
            mutate(
              `order/company/list?status_id=1&page=1&per_page=${pageAmount}&sort[create_datetime]=DESC`,
              $api
                .patch(`order/${data.id}/status`, {
                  status_id: ++data.status_id,
                })
                .then((resp) => console.log(resp)),
              {
                populateCache: (updateList, list) => {
                  console.log(updateList, list, "AKTUALNO")
                  return { ...list }
                },
                // revalidate: false,
              }
            )
          }}
        >
          {statusBtnText()}
        </TableStatusBtn>
      )}
      <TableStatusBtnCircle
        onClick={() => {
          dispatch(openChat(data.chat_id))
          console.log(data.chat_id)
        }}
        as="button"
      >
        <MessageSvg />
        {isMobile && t("ChatClinet")}
      </TableStatusBtnCircle>
      {(!isMobile || (isMobile && completed)) && (
        <TableBtnPhone phoneSender={data.sender_phone} phoneRecipient={data.recipient_phone} />
      )}
      {!isMobile && <TableStatusBtnBag data={data} />}
    </TableStatusButtons>
  )
}
