import { useTranslations } from "next-intl"
import styled from "styled-components"
import { TableGrid } from "../../../pages/crm/employees"
import { JC_SB, media } from "../../../styles/style-variables"
import { TrashSvg } from "../../all-svg"
import { TrashBtn } from "../orders/table/table-item"

const TableItemS = styled.div`
  padding: 16px;
  color: black;
  position: relative;
  :not(:last-child) {
    /* border-bottom: 1px solid #d4d6d6; */
  }
  b,
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  p {
    font-weight: 400;
  }
  ${media.mobile} {
    background: white;
    margin-bottom: 8px;
    border-radius: 12px;
    padding: 24px 16px 32px;
    p {
      margin-top: 16px;
    }
    b {
      :first-child {
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
      }
      :not(:first-child) {
        font-weight: 400;
      }
    }
  }
`

interface TableItemProps {
  data: {
    name: string
    email: string
    type_id: number
  }
  isMobile: boolean
  trashClick: () => void
}

export const TableItem = ({ data, isMobile, trashClick }: TableItemProps) => {
  const t = useTranslations("Employees");
  const positionOut = (data) => {
    return data === 2 ? t("Text9") : data !== 1 ? t("Text11") : t("Text10")
  }

  return (
    <TableItemS>
      {isMobile && (
        <TrashBtn onClick={trashClick}>
          <TrashSvg />
        </TrashBtn>
      )}
      <JC_SB>
        <TableGrid>
          <b>{data.name}</b>
          <b>{positionOut(data.type_id)}</b>
          <p>{data.email}</p>
        </TableGrid>
        {!isMobile && (
          <TrashBtn onClick={trashClick}>
            <TrashSvg />
          </TrashBtn>
        )}
      </JC_SB>
    </TableItemS>
  )
}
