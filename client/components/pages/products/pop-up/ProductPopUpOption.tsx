import { useState, useEffect } from "react"
import styled from "styled-components"
import { media } from "../../../../styles/style-variables"
import { AddBtnUI } from "../../../UI-kit/buttonsU"
import { AuthInputUI } from "../../../UI-kit/inputs"
import { SaveBtn, WrapperMobile } from "./PorductPopUp"
import { InputUpload } from "./AddPhoto"
import { useTranslations } from "next-intl"
import { useproductsPopUp } from "../../../../store/hooks/useproductsPopUp"
import $api from "../../../../http/api-manipulation"
import {  getProduct } from "../../../../http/ProductsService"
import { closeBag } from "../../../../store/slices/bagPopUp"
import { useDispatch } from "react-redux"

import { TabLang } from "./TabLang"

const Wrapper = styled.form`
  background: white;
  border-radius: var(--default-border-radius);
  padding: 32px 0px;
  max-height: 633px;
  @media screen and (min-width: 1370px) {
    padding: 16px 0px;
  }
  ${media.mobile} {
    ${WrapperMobile}
  }
`

const Header = styled.div`
  padding: 0px 24px;

  h1 {
    font-family: ProximaNova;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 16px;
  }
  > div:last-child {
    margin: 16px 0px 0px;
  }
  ${media.mobile} {
    padding: 24px 16px 0px;
  }
`

const PhotoWrapper = styled.div<{ background?: any }>`
  height: 30vh;
  max-height: 218px;
  background: ${({ background }) =>
    background ? `center  / contain no-repeat url(${background}), #f0f0f0` : "#f0f0f0"};
  position: relative;
  label {
    position: absolute;
    right: 24px;
    bottom: 16px;
    height: fit-content;
    cursor: pointer;
    ${media.notMobile} {
      :hover button {
        background: #b9382f;
      }
    }
    button {
      pointer-events: none;
    }
  }
`

const Footer = styled.footer`
  padding: 1vw 24px 0px;
  button {
    margin: 5vh 0px 0px;
  }
  ${media.mobile} {
    /* 12px идут по ui */
    padding: calc(32px - 12px) 16px;
  }
`
const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  div:last-child {
    margin-top: unset !important;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`

const UseAddBtn = styled.label``

const MobileSaveBtn = styled.div`
  ${media.mobile} {
    width: calc(100% + 32px);
    margin-left: -16px;
  }
`

export const ProductPopUpOption = () => {
  const t = useTranslations("ProductPopUp")
  const { getData } = getProduct()
  const { editingTitle, id } = useproductsPopUp()
  const [imageURL, setImageURL] = useState<any>([])
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState("Русский")
  const checkActiveTab = activeTab === "Русский"
  let imageURLCheck = imageURL.length === 0

  const [inputValue, setInputValue] = useState<any>({})

  async function uploadFile(formData) {
    try {
      const response = await $api.post("file/upload", formData)
      setImageURL([response.data.file.url])
      setInputValue({
        ...inputValue,
        gallery: [response.data.file.url],
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      setImageURL(id)
    } else {
      setImageURL([])
    }
    console.log(id)
  }, [id])

  const handleOnChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)
    uploadFile(formData)
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
          price: inputValue.price,
          preview: inputValue.gallery[inputValue.gallery.length - 1],
          gallery: inputValue.gallery,
        })
        .then((resp) => {
          getData()
          dispatch(closeBag())
        })
    } else {
      $api
        .post(`product/new`, {
          details: [
            {
              language: "EN",
              description: inputValue.en.title ? inputValue.en.title : inputValue.ru.title,
              title: inputValue.en.title ? inputValue.en.title : inputValue.ru.title,
            },
            {
              language: "RU",
              title: inputValue.ru.title,
              description: inputValue.ru.title,
            },
          ],
          price: inputValue.price,
          preview: inputValue.gallery[inputValue.gallery.length - 1],
          gallery: inputValue.gallery,
          type_id: 2,
        })
        .then((resp) => {
          getData()
          dispatch(closeBag())
        })
        .catch((err) => {
          console.log(inputValue)
          console.log(err)
        })
    }
  }

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

  useEffect(() => {
    if (Object.keys(inputValue).length !== 0) {
      setInputValue({
        ...inputValue,
        title: checkActiveTab ? inputValue.ru.title : inputValue.en.title,
        description: checkActiveTab ? inputValue.ru.description : inputValue.en.description,
      })
      console.log(inputValue)
    }
  }, [activeTab])

  const inputChange = (e) => {
    const { name, value } = e.target
    let formatValue = value
    const key = checkActiveTab ? `ru` : `en`
    if (name === "price") {
      formatValue = value.replace(/[^0-9+]/g, "")
    }
    setInputValue({
      ...inputValue,
      [key]: { ...inputValue[key], [name]: formatValue },
      [name]: formatValue,
    })
    console.log(inputValue)
  }

  return (
    <Wrapper onSubmit={SubmitForm}>
      <Header>
        <h1>{!editingTitle ? t("RedPhoto") : t("RedPhoto1")}</h1>
        <TabLang SetActive={setActiveTab} activeTab={activeTab} />
      </Header>
      <PhotoWrapper background={imageURLCheck ? false : inputValue.gallery[0]}>
        <UseAddBtn htmlFor="file-loader-button2">
          <AddBtnUI
            popUpOptionLogic={imageURLCheck}
            as="input"
            text={imageURLCheck ? t("AddPhoto") : t("ChangePhoto")}
          />
        </UseAddBtn>
        <InputUpload id="file-loader-button2" type="file" onChange={handleOnChange} />
      </PhotoWrapper>
      <Footer>
        <InputsWrapper>
          <AuthInputUI
            name={"price"}
            handleChange={inputChange}
            value={inputValue.price}
            AlignI={"flex-start"}
            text={t("Input1")}
          />
          <AuthInputUI
            name={"title"}
            handleChange={inputChange}
            value={inputValue.title}
            AlignI={"flex-start"}
            text={t("Input2")}
          />
        </InputsWrapper>
        <MobileSaveBtn>
          <SaveBtn>{t('SaveBtn')}</SaveBtn>
        </MobileSaveBtn>
      </Footer>
    </Wrapper>
  )
}
