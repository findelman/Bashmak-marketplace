import styled from "styled-components"
import { media } from "../../../styles/style-variables"

const TooltipWrapper = styled.div`
  background: white;
  padding: 16px 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 0px 16px 4px rgba(0, 0, 0, 0.14);
  b {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }
  ${media.mobile} {
    padding: 12px 24px;
    b {
      font-size: 16px;
      line-height: 24px;
    }
  }
`

const TooltipSubP = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  ${media.mobile} {
    font-size: 14px;
    line-height: 22px;
  }
`

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipWrapper>
        <b>{`${payload[0].payload.amount} заявок`}</b>
        <TooltipSubP>{payload[0].payload.date} 2022</TooltipSubP>
      </TooltipWrapper>
    )
  }

  return null
}
