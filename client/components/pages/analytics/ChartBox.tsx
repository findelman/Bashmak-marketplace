import { useTranslations } from "next-intl"
import styled from "styled-components"
import { media } from "../../../styles/style-variables"
import { ArrowSvg, NoteSvg } from "../../all-svg"
import { DataBtn } from "../orders/AccardionBtn"

const ChartBoxS = styled.div`
  border-radius: 12px;
  min-height: 457px;
  background: white;
  color: black;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 32px;
  h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 12px;
  }
  button {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    cursor: pointer;
    :last-child {
      border-bottom: 1px solid #132926;
    }
  }

  ${media.mobile} {
    padding: 24px 0px;
    h3 {
      margin-bottom: 16px;
    }
    .recharts-wrapper {
      background: #f5f5f5;
    }
  }
`

const ChangeInfo = styled.div`
  display: flex;
  gap: 16px;
  ${media.notMobile} {
    margin-bottom: 28px;
  }
`

const MobilePadding = styled.div`
  b {
    display: block;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    margin-top: 32px;
  }
  ${media.mobile} {
    padding: 0px 16px;
    b {
      margin-top: 20px;
      font-size: 20px;
      line-height: 28px;
    }
  }
`

const btnStyle = `
border-bottom: 1px solid #132926;
  `

export const ChartBox = ({ title , chart,total = '0' }) => {
  const t = useTranslations("Analytics");
  return (
    <ChartBoxS>
      <MobilePadding>
        <h3>{title}</h3>
        <ChangeInfo>
          <button>{t('Text2')}</button>
          <DataBtn formatDate={"MMMM yyyy"} 
          width={'max-content'} showMonthYearPicker={true} btnStyle={btnStyle} />
        </ChangeInfo>
      </MobilePadding>
      {chart}
      <MobilePadding>
        <b>{t('Text3')} {total} ₸</b>
      </MobilePadding>
    </ChartBoxS>
  )
}
