import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import styled from "styled-components"
import { JC_SB, media } from "../../../styles/style-variables"
import { ArrowSvg } from "../../all-svg"
import { AuthInputUI } from "../../UI-kit/inputs"
import { SaveBtn } from "../products/pop-up/PorductPopUp"
import { mutate } from "swr"
import { useDispatch } from "react-redux"
import $api from "../../../http/api-manipulation"
import { closeBag } from "../../../store/slices/bagPopUp"
const Wrapper = styled.form`
  background: white;
  border-radius: var(--default-border-radius);
  color: black;
  padding: 32px;
  h2 {
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    font-family: ProximaNova;
  }
  ${media.mobile} {
    padding: 32px 16px 24px;
    margin: 0px 16px;
    h2 {
      font-weight: 700;
      font-size: 28px;
      line-height: 36px;
      text-align: center;
    }
  }
`

const DropDownWrapper = styled.div`
  margin-top: 24px;
  position: relative;
`

const TransformText = styled.p<{ selectActive?: any }>`
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  line-height: 24px;
  ${media.mobile} {
    transition: var(--default-transition) linear;
    top: ${({ selectActive }) => (selectActive ? "21%" : "50%")};
    transform: translateY(-50%);
    left: 18px;
    margin-bottom: unset;
    font-weight: 400;
    position: absolute;
    ${({ selectActive }) =>
      selectActive &&
      `    font-weight: 400;
    font-size: 14px;
    opacity: 0.4;
    line-height: 20px;`}
  }
  :hover ~ div {
    border: 1px solid #132926;
  }
`

const DropDownHidden = styled.div`
  position: absolute;
  width: 100%;
  bottom: -4px;
  transform: translateY(100%);
  left: 0;
  overflow: hidden;
  background: white;
  box-shadow: -3px 9px 9px 7px #00000017;
  transition: var(--default-transition) linear;
  border-radius: var(--default-border-radius);

  div {
    padding: 12px 16px;
    transition: var(--default-transition) linear;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    text-align: left;
    :hover {
      background: #e8eaea;
    }
  }
`
const DropDownS = styled(JC_SB)<{ showDropDown }>`
  border: 1px solid #e1d9c4;
  border-radius: 8px;
  border-radius: 8px;
  padding: 18px;
  cursor: pointer;
  min-height: 62px;
  position: relative;
  line-height: 24px;
  transition: var(--default-transition) linear;
  :hover {
    border: 1px solid #132926;
  }
  svg {
    transition: var(--default-transition) linear;
    transform: rotate(${({ showDropDown }) => (showDropDown ? "180" : "0")}deg);
  }
  ${DropDownHidden} {
    opacity: ${({ showDropDown }) => (showDropDown ? "1" : "0")};
    visibility: ${({ showDropDown }) => (showDropDown ? "visilbe" : "hidden")};
  }
`

const SendBtn = styled(SaveBtn)`
  width: 100%;
  margin: 40px 0px 0px 0px;
  ${media.mobile} {
    position: inherit;
    border-radius: 12px;
    margin-top: 32px;
  }
`

const Error = styled.p`
  margin: 10px 0px -18px;
  color: red;
`

const DropDown = ({ refq, setsendData }) => {
  const t = useTranslations("Employees")
  const [showDropDown, SetShowDropDown] = useState(false)

  const toggleDropDown = () => SetShowDropDown(!showDropDown)

  const [text, SetText] = useState("")

  const changeText = (e) => {
    const targetText = e.target.innerHTML
    const dataId = e.target.dataset.id
    SetText(targetText)
    setsendData((prevState) => {
      return { ...prevState, type_id: dataId }
    })
  }
  return (
    <DropDownWrapper>
      <TransformText selectActive={text.length}>{t('Role')}</TransformText>
      <DropDownS showDropDown={showDropDown} onClick={toggleDropDown}>
        <p ref={refq}>{text}ㅤ</p> <ArrowSvg />
        <DropDownHidden>
          <div data-id="2" onClick={changeText}>
            {t("Text9")}
          </div>
          <div data-id="1" onClick={changeText}>
            {t("Text10")}
          </div>
        </DropDownHidden>
      </DropDownS>
    </DropDownWrapper>
  )
}

export const EmployessPopUp = ({ isMobile }) => {
  const t = useTranslations("Employees")
  const ref = useRef<any>()
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  const [sendData, setsendData] = useState({
    email: "",
    name: "",
    type_id: "",
  })

  const BtnClick = (e) => {
    e.preventDefault()
    console.log(ref.current.innerHTML.trim().length)
    if (ref.current.innerHTML.trim().length < 5) {
      setError("Выберите роль")
    } else {
      setError("")
      mutate(
        `employee/list?page=1&per_page=10`,
        $api.post(`employee/invite`, sendData),
        {
          // Код ниже был сделан чтобы не отпровлять повторный запрос, для полчуения листа, но так как в ответ на добовление не возвращает id пришлось отказаться от этого решения
          // populateCache: (updateEmployes, employes) => {
          //   console.log(updateEmployes, employes)
          //   employes.results.push(sendData)
          //   return { results: [...employes.results] }
          // },
          // revalidate: false,
        }
      )
      dispatch(closeBag())
    }
  }

  const inputChange = (e) => {
    const target = e.target
    const { value, name } = target

    console.log(value, name)
    setsendData({ ...sendData, [name]: value })
    console.log(sendData)
  }

  return (
    <Wrapper onSubmit={BtnClick}>
      <h2>
        {t("Text6")} {isMobile && <br></br>} {t("Text7")}
      </h2>
      <AuthInputUI
        handleChange={inputChange}
        name="email"
        type="email"
        AlignI={"left"}
        text={"E-mail"}
      />
      <AuthInputUI
        handleChange={inputChange}
        name="name"
        type="text"
        AlignI={"left"}
        text={t("Text2")}
      />
      <DropDown setsendData={setsendData} refq={ref} />
      <Error>{error}</Error>
      <SendBtn>{t("Text8")}</SendBtn>
    </Wrapper>
  )
}
