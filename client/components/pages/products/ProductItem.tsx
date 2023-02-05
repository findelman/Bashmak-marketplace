import Image from "next/image"
import styled from "styled-components"
import { media, SumFormat } from "../../../styles/style-variables"
import { TrashSvg } from "../../all-svg"
import { TrashBtn } from "../orders/table/table-item"

import defaultImg from "../orders/DefImg.png"
import { useCallback, useEffect } from "react"
import { useTranslations } from "next-intl"
import { FormatSum } from "../../common/utils/FormatSum"
import { useDispatch } from "react-redux"
import { editingTrue } from "../../../store/slices/productsPopUp"
import { showBag } from "../../../store/slices/bagPopUp"
import $api from "../../../http/api-manipulation"
import { getProduct } from "../../../http/ProductsService"
import { useLang } from "../../helpers/useLang"

const ImgWrapper = styled.div`
  max-width: 112px;
  position: relative;
  width: 100%;
  height: 131px;
  margin: 0 auto;
  img {
    object-fit: cover;
  }
`

const ProductItemText = styled.div`
  color: black;
  b {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`

const ProducItemBtns = styled.button`
  border: 1px solid #e2e2e2;
  border-radius: 16px;
  width: 100%;
  color: #132926;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 0px;
  transition: var(--default-transition) linear;
  :hover {
    background: #e2e2e2;
  }
  :not(:first-child) {
    margin-top: 12px;
  }
  ${media.mobile} {
    font-size: 14px;
    line-height: 22px;
  }
`

const ProductItemS = styled.div`
  height: 335px;
  border: 0.5px solid #e2e2e2;
  background: white;
  padding: 0px 16px 24px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  position: relative;
  ${media.mobile} {
    padding: 0px 12px 24px;
  }
`

export const ProductItem = ({ TogglePopUp, completed, data, checkHeaderTab, checkSubTab }: any) => {
  const { getData } = getProduct()
  const lang = useLang()
  const t = useTranslations("Products")
  const dispatch = useDispatch()
  const EditBtnClick = useCallback(
    (e) => {
      dispatch(showBag({}))
      TogglePopUp(checkHeaderTab ? 1 : 2)
      dispatch(editingTrue({ id: data }))
      console.log(data, "HELLO")
    },
    [data]
  )

  //
  const withdrawBtnClick = () => {
    console.log(data)
    console.log(checkSubTab)
    $api
      .patch(`product/${data.id}/update`, {
        in_sale: !checkSubTab,
      })
      .then((resp) => getData())
  }

  return (
    <ProductItemS>
      {completed && (
        <TrashBtn
          as="button"
          data-popUp-content="DeletePopUp"
          onClick={(e) => {
            console.log(data)
            TogglePopUp(3)
            dispatch(showBag({ id: data.id, section: "products" }))
          }}
        >
          <TrashSvg />
        </TrashBtn>
      )}
      <ImgWrapper>
        <Image fill alt="" src={data.gallery.length !== 0 ? data.gallery[0]?.url : defaultImg} />
      </ImgWrapper>
      <ProductItemText>
        {}
        <b>{FormatSum(data.price)} ₸</b>
        <p>{data.details[lang]?.title}</p>
      </ProductItemText>
      <div>
        <ProducItemBtns
          data-popUp-content={checkHeaderTab ? "ProductPopUp" : "ProductPopUpOption"}
          onClick={EditBtnClick}
        >
          {t("ProductBtn1")}
        </ProducItemBtns>
        <ProducItemBtns onClick={withdrawBtnClick}>{ checkSubTab ? t("ProductBtn2") : t('ProductBtn3')}</ProducItemBtns>
      </div>
    </ProductItemS>
  )
}
