import { useCallback, useState } from "react"
import styled from "styled-components"
import { FlexOnlyCenter, media, SumFormat } from "../../../../styles/style-variables"

import { ProductBox } from "./mobile/ProductBox"
import { TableStatusButtonS } from "./buttons/ButtonsContainer"
import { TableStatusProgress } from "./TableStatusProgress"
import { CalculateSum } from "./CalculateSum"
import { useTranslations } from "next-intl"

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr 1.2fr 1.3fr 1fr 1.45fr 4fr;
  gap: 20px;
  width: 100%;
  ${media.notMobile} {
    align-items: flex-start;
  }
  > b:last-child,
  > div:last-child {
    justify-self: flex-end;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 4px;
    > p:first-child {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 8px;
    }

    > b:last-child,
    > div:last-child {
      justify-self: unset;
    }
  }
`

const TalbeStatusItem = styled.div`
  padding: 22px 0px;
  position: relative;
  border-bottom: 1px solid #d4d6d6;
  margin: 0px 16px;
  display: flex;
  ${media.mobile} {
    padding: 20px 16px 0px;
    border-radius: 12px;
    background: white;
    /* border-bottom: unset; */
    margin-bottom: 20px;
    margin: 0px -16px 20px;
    .notMobile {
      display: none;
    }
  }
`

export const TrashBtn = styled(FlexOnlyCenter)`
  position: absolute;
  border: 1px solid #ffd2d2;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  right: 4px;
  top: 4px;
  cursor: pointer;
  z-index: 1;
  background: white;
  transition: var(--default-transition) linear;
  svg {
    pointer-events: none;
  }
  svg path {
    transition: var(--default-transition) linear;
  }
  :hover {
    background: var(--default-red);
    svg path {
      stroke: white;
    }
  }
`

interface TableItemProps {
  data: {
    id: string
    address: string
    adress: string
    sum: string
    status: string
    amount: string
    raiting: string
    create_datetime?: string
    delivery_date?: string
    phone: {
      sender?: string
      recipient?: string
    }
  }
  completed: boolean
  isMobile: boolean
}

export const TableItem = ({ data, completed, isMobile }: any) => {
  const t = useTranslations("Table")
  // Форматируем дату
  const formatCreateDate = useCallback((date) => {
    date = new Date(date)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().substr(2)}`
  }, [])
  return (
    <TalbeStatusItem>
      <Grid>
        <p>
          {isMobile && "№ "}
          {data.id}
        </p>
        <p>
          {isMobile && t("HeaderText1")}&nbsp;
          {formatCreateDate(data.create_datetime)}
        </p>
        <p>
          {isMobile && (completed ? t("HeaderText2") : t("HeaderText3"))}
          {isMobile && <>&nbsp;</>}
          {data.delivery_date}
          {!isMobile && <p> {data.delivery_time}</p>}
        </p>
        <p>
          {isMobile && <>{t("HeaderText4")} &nbsp;</>}

          {data.address}
        </p>
        <p className="notMobile">{CalculateSum(data.products)} ₸</p>
        <TableStatusProgress isMobile={isMobile} data={data} completed={completed} />
        <TableStatusButtonS data={data} completed={completed} isMobile={isMobile} />
        <ProductBox data={data.products} isMobile={isMobile} />
      </Grid>
    </TalbeStatusItem>
  )
}
