import { Console } from "console"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import $api from "../../../../http/api-manipulation"
import {getProduct } from "../../../../http/ProductsService"
import { useDevice } from "../../../../store/hooks/useDevice"
import { useproductsPopUp } from "../../../../store/hooks/useproductsPopUp"
import { closeBag } from "../../../../store/slices/bagPopUp"
import { CustomScrollText, JC_SB, media } from "../../../../styles/style-variables"

import { AuthInputUI } from "../../../UI-kit/inputs"
import { AddPhoto } from "./AddPhoto"
import { TabLang } from "./TabLang"

export const WrapperMobile = `
  grid-template-columns: 1fr;
  height: auto;
  border-radius: unset;
height: 100%;
  padding: 0px 0px 40px;
`

const Wrapper = styled.form`
  border-radius: var(--default-border-radius);
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  overflow: hidden;
  max-width: 931px;
  ${media.mobile} {
    ${WrapperMobile}
  }
`

const AddProduct = styled.div`
  background: #ffffff;
  padding: 24px;
  h1 {
    font-family: ProximaNova;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    ${media.mobile} {
      font-size: 28px;
      line-height: 36px;
    }
  }
  display: flex;
  flex-direction: column;
  ${media.mobile} {
    padding: 24px 16px;
  }
`

const InputsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  > div {
    margin-top: unset !important;
    :last-child {
      margin-top: 8px !important;
      grid-column: 1 / 3;
      ${media.mobile} {
        grid-column: unset;
      }
      textarea {
        height: 101px;
        ${CustomScrollText}
      }
    }
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px 0px;
  }
`

const AddProductFooter = styled(JC_SB)`
  align-items: center;
  padding: 20px 0px 0px;
  ${media.notMobile} {
    border-top: 1px solid #e2e2e2;
  }
  margin-top: auto;
  button {
    margin-top: unset;
  }
  ${media.mobile} {
    width: calc(100% + 32px);
    margin-left: -16px;
  }
`

export const SaveBtn = styled.button`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: white;
  background: var(--default-red);
  transition: var(--default-transition) linear;
  padding: 16px 32px;
  border-radius: 12px;
  display: block;
  margin: 20px 0px 0px auto;
  ${media.mobile} {
    width: 100%;
    bottom: 0;
    left: 0;
    border-radius: unset;
    margin-left: auto;
    margin-bottom: 23px;
  }
  ${media.notMobile} {
    :hover {
      background: #b9382f;
    }
  }
`

const ValidateMessage = styled.p<{ show?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ff1e1e;
  transition: var(--default-transition) linear;
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`

export const ProductPopUp = () => {
  const { getData } = getProduct()
  const t = useTranslations("ProductPopUp")
  const { editingTitle, id } = useproductsPopUp()
  const { isMobile } = useDevice()
  const dispatch = useDispatch()
  const [inputValidate, SetInputValidate] = useState(false)
  const [activeTab, setActiveTab] = useState("Русский")

  const checkActiveTab = activeTab === "Русский"
  const [inputValue, setInputValue] = useState<any>({})
  useEffect(() => {
    if (Object.keys(inputValue).length !== 0) {
      setInputValue({
        ...inputValue,
        title: checkActiveTab ? inputValue.ru.title : inputValue.en.title,
        description: checkActiveTab ? inputValue.ru.description : inputValue.en.description,
      })
    }
  }, [activeTab])
  useEffect(() => {
    id.length === 0
      ? setInputValue({
          price: "",
          description: "",
          title: "",
          gallery: [],
          ru: {
            title: "",
            description: "",
          },
          en: {
            title: "",
            description: "",
          },
        })
      : setInputValue({
          price: id.id.price,
          description: id.id.details.ru.description,
          title: id.id.details.ru.title,
          ru: {
            title: id.id.details.ru.title,
            description: id.id.details.ru.description,
          },
          en: {
            title: id.id.details.en.title,
            description: id.id.details.en.description,
          },
          gallery: id.id.gallery.map((item) => item.url),
        })
  }, [id])

  const inputChange = (e) => {
    const { name, value } = e.target
    let formatValue = value
    const key = checkActiveTab ? `ru` : `en`
    if (name === "price") {
      formatValue = value.replace(/[^0-9+]/g, "")
    }
    // console.log(inputValue[taruseLang[e.target.name]])
    setInputValue({
      ...inputValue,
      [key]: { ...inputValue[key], [name]: formatValue },
      [name]: formatValue,
    })
    console.log(inputValue)
  }

  const SubmitForm = (e) => {
    e.preventDefault()
    if (id.id !== undefined) {
      const ID = id.id.id

      console.log(ID)
      $api
        .patch(`product/${ID}/update`, {
          details: [
            {
              language: "EN",
              description: inputValue.en.description,
              title: inputValue.en.title,
            },
            {
              language: "RU",
              description: inputValue.ru.description,
              title: inputValue.ru.title,
            },
          ],
          gallery: inputValue.gallery,
          price: inputValue.price,
        })
        .then((resp) => {
          getData()
          dispatch(closeBag())
          setActiveTab("Русский")
        })
    } else {
      $api
        .post(`product/new`, {
          details: [
            {
              language: "RU",
              title: inputValue.ru.title,
              description: inputValue.ru.description,
            },
            {
              language: "EN",
              description: inputValue.en.title ? inputValue.en.title : inputValue.ru.title,
              title: inputValue.en.title ? inputValue.en.title : inputValue.ru.title,
            },
          ],
          price: inputValue.price,
          preview: inputValue.gallery[0],
          gallery: inputValue.gallery,
          type_id: 1,
        })
        .then((resp) => {
          getData()
          dispatch(closeBag())
          setActiveTab("Русский")
        })
    }
  }
  return (
    <Wrapper onSubmit={SubmitForm}>
      {!isMobile && (
        <AddPhoto inputValue={inputValue} setDataGallery={setInputValue} data={id.id?.gallery} />
      )}
      <AddProduct>
        <h1>{!editingTitle ? t("Title") : t("Title2")}</h1>
        <TabLang SetActive={setActiveTab} activeTab={activeTab} />
        {isMobile && (
          <AddPhoto inputValue={inputValue} setDataGallery={setInputValue} data={id.id?.gallery} />
        )}
        <InputsGrid>
          <AuthInputUI
            handleChange={inputChange}
            value={inputValue.price}
            name={"price"}
            AlignI={"flex-start"}
            text={t("Input1")}
          />
          <AuthInputUI
            handleChange={inputChange}
            name={"title"}
            value={inputValue.title}
            AlignI={"flex-start"}
            text={t("Input2")}
          />
          <AuthInputUI
            labelT={"18px"}
            handleChange={inputChange}
            name={"description"}
            value={inputValue.description}
            AlignI={"flex-start"}
            text={t("Input3")}
            inputSwitch={false}
            areaRequired={true}
          />
        </InputsGrid>
        <AddProductFooter>
          {inputValidate && (
            <ValidateMessage show={inputValidate}>{t("ValidateMessage")}</ValidateMessage>
          )}

          <SaveBtn>{t("SaveBtn")}</SaveBtn>
        </AddProductFooter>
      </AddProduct>
    </Wrapper>
  )
}
