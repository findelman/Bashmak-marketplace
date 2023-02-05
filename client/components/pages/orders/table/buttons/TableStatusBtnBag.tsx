import styled from "styled-components"
import { useBag} from "../../../../../store/hooks/useBag"

import { FlexOnlyCenter } from "../../../../../styles/style-variables"
import { BagSvg } from "../../../../all-svg"

const TableStatusBtnBagS = styled(FlexOnlyCenter)`
  padding: 8px 12px;
  border: 1px solid rgba(19, 41, 38, 0.1);
  border-radius: 8px;
  transition: var(--default-transition) linear;
  p {
    margin-right: 4px;
  }
  :hover {
    background: #d4d6d6;
  }
`

export const TableStatusBtnBag = ({ data }) => {
  const {_showBag} = useBag()

  return (
    <TableStatusBtnBagS
      as="button"
      data-id={data.id}
      onClick={() => {
        _showBag(data.id)
      }}
    >
      <p>{data.products.length}</p>
      <BagSvg />
    </TableStatusBtnBagS>
  )
}
