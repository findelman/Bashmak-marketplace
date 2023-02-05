import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import { productActiveApi } from "../../../../../fakeapi/api"
import { JC_SB, media, SumFormat } from "../../../../../styles/style-variables"
import { ArrowSvg } from "../../../../all-svg"

import { BagItem } from "../BagPopUp"
import { CalculateSum } from "../CalculateSum"

const ProductBoxS = styled.div`
  padding: 20px 0px;
  h2 {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
  }
  display: none;
  ${media.mobile} {
    display: block;
  }
`

const ShowMore = styled.button<{ isActive?: boolean }>`
  font-weight: 600;
  margin-top: 20px;
  font-size: 16px;
  line-height: 24px;
  svg {
    transition: var(--default-transition) linear;
    transform: rotate(${({ isActive }) => (isActive ? "" : "180")}deg);
  }
`

export const ProductBox = ({ data, isMobile }) => {
  const t = useTranslations("Bag")
  const [count, setCount] = useState(2)
  const [toggleAccardion, setAccardion] = useState(true)
  const toggleCount = () => {
    setAccardion(!toggleAccardion)
    toggleAccardion ? setCount(data.length) : setCount(2)
  }

  return (
    <>
      <ProductBoxS>
        <h2>
          {data.length} {t("Product")} / {CalculateSum(data)} ₸
        </h2>

        {data.slice(0, count).map((item, key) => {
          return <BagItem key={key} data={item} />
        })}
        {data.length > 2 && (
          <ShowMore isActive={toggleAccardion} onClick={toggleCount}>
            {toggleAccardion ? t("UnWrap") : t("Wrap")} <ArrowSvg />
          </ShowMore>
        )}
      </ProductBoxS>
    </>
  )
}
