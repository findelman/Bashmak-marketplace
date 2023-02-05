import { useTranslations } from "next-intl"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import { JC_SB, media, SumFormat } from "../../../../styles/style-variables"
import { FormatSum } from "../../../common/utils/FormatSum"

import defaultImg from "../ProductBoxImg.png"
import { CalculateSum } from "./CalculateSum"

const Wrapper = styled.div`
  background: white;
  border-radius: 12px;
  ${media.notMobile} {
    width: 328px;
  }
`

const Text = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  ${media.mobile} {
    font-size: 16px;
    line-height: 24px;
  }
`

const Header = styled.header`
  padding: 16px 20px;
  border-bottom: 1px solid #cfcfcf;
  h2 {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
`

const ItemsList = styled.div`
  padding: 0px 20px;
  overflow-y: scroll;
  max-height: 62vh;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 12px 12px #b1b1b1;
    border: solid 4px transparent;
    border-radius: 12px;
  }
`
const Item = styled(JC_SB)`
  padding: 16px 0px;
  /* Компенсируем смещение которое даёт скролл */
  margin-right: -10px;
  :not(:last-child) {
    border-bottom: 1px solid #e2e2e2;
  }
  small {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  ${media.mobile} {
    padding: 8px 0px;
  }
`

export const BagItem = ({ data }) => {
  const t = useTranslations("Bag");
  return (
    <Item>
      <div>
        <Text>{data.title}</Text>
        <small>
          {FormatSum(data.price)} ₸ / {data.quantity}{t('Unit')}
        </small>
      </div>
      <Image alt="" src={defaultImg} />
    </Item>
  )
}

export const BagPopUp = React.memo(function BagPopUp({ data }: any) {
  const t = useTranslations("Bag");
  const totalSum = CalculateSum(data)

  return (
    <Wrapper>
      {data && (
        <>
          <Header>
            <h2>{data.length} {t('BayProduct')}</h2>
            <Text>{t('TotalSum')} {totalSum} ₸</Text>
          </Header>
          <ItemsList>
            {data.map((item, key) => {
              return <BagItem key={key} data={item} />
            })}
          </ItemsList>
        </>
      )}
    </Wrapper>
  )
})
