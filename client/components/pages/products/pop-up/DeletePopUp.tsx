import { useTranslations } from "next-intl"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import $api from "../../../../http/api-manipulation"
import {  getProduct } from "../../../../http/ProductsService"
import { useBag } from "../../../../store/hooks/useBag"
import { closeBag } from "../../../../store/slices/bagPopUp"
import { media } from "../../../../styles/style-variables"
import { SaveBtn } from "./PorductPopUp"
import { mutate } from "swr"
const Wrapper = styled.div`
  background: red;
  max-width: 384px;
  padding: 32px;
  text-align: center;
  box-shadow: 0px 16px 48px rgba(86, 75, 45, 0.16);
  border-radius: 12px;
  background: #ffffff;
  h1 {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: black;
  }
  ${media.mobile} {
    margin: 0px 16px;
    padding: 32px 16px 24px;
    max-width: 100%;
    h1 {
      font-weight: 700;
      font-size: 28px;
      line-height: 34px;
    }
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  button {
    margin: unset;
    width: 100%;
    position: relative;
    border-radius: 15px;
    :first-child {
      background: #000000;
    }
  }
  ${media.mobile} {
    margin-top: 24px;
    gap: 12px;
    flex-flow: wrap-reverse;
  }
`

export const DeletePopUp = ({ text }) => {
  const t = useTranslations("PopUp")
  const dispatch = useDispatch()
  const { id, section } = useBag()
  const { getData } = getProduct()

  return (
    <Wrapper>
      <h1>{text}</h1>
      <ButtonsWrapper>
        <SaveBtn
          onClick={() => {
            dispatch(closeBag())
          }}
        >
          {t("Cancel")}
        </SaveBtn>
        <SaveBtn
          onClick={() => {
            if (section === "products") {
              console.log(id)
              console.log(id)
              $api
                .delete(
                  `product/${id}/delete`
                )
                .then((resp) => {
                  dispatch(closeBag())
                  getData()
                })
            } else {
              // mutate('employee/list?page=1&per_page=10', $api.delete(`employee/${id}/delete`))
              mutate(
                `employee/list?page=1&per_page=10`,
                $api.delete(
                  `employee/${id}/delete`
                ),
                {
                  populateCache: (updateEmployes, employes) => {
                    const filteredemployes = employes.results.filter((todo) => todo.id !== id)
                    return { results: [...filteredemployes] }
                  },
                  revalidate: false,
                }
              )
              dispatch(closeBag())
            }
          }}
        >
          {t("Delete")}
        </SaveBtn>
      </ButtonsWrapper>
    </Wrapper>
  )
}
