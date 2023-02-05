import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useDevice } from "../../store/hooks/useDevice"
import { FlexCenter, media } from "../../styles/style-variables"

const AuthInputWrapper = styled.div<{ AlignI?: any }>`
  display: flex;
  flex-flow: column;
  align-items: ${({ AlignI }) => AlignI};
  label {
    margin-bottom: 12px;
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    line-height: 24px;
  }
  input,
  textarea {
    padding: 18px;
    resize: none;
    width: 100%;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    transition: var(--default-transition) linear;
    :hover,
    :focus {
      border: 1px solid #132926;
    }
  }
  :not(:first-child) {
    margin-top: 24px;
  }
  ${media.mobile} {
    input,
    textarea {
      padding: 28px 18px 8px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
    margin-top: 12px;
  }
`

const InputWrapper = styled(FlexCenter)<{ labelT?: string }>`
  width: 100%;
  position: relative;
  /* border: 1px solid #e2e2e2; */
  border-radius: 8px;
  label {
    transition: var(--default-transition) linear;
    position: absolute;
    left: 16px;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 16px;
    top: ${({ labelT }) => labelT};
    color: #132926;
    line-height: 24px;
    opacity: 0.4;
  }
  input:focus ~ label,
  textarea:focus ~ label {
    font-weight: 400;
    line-height: 24px;
    transform: translateY(-53%);
    font-size: 14px;
  }
`

const LabelActiveS = styled.label<{ isActive?: boolean }>`
  transition: var(--default-transition) linear;
  position: absolute;
  left: 16px;
  margin-bottom: 0;
  font-weight: 500;

  color: #132926;
  line-height: 24px;
  opacity: 0.4;
  ${({ isActive }) =>
    isActive &&
    ` {
      font-size: 14px !important;
        font-weight: 400;
    line-height: 20px;
    transform: translateY(-53%);
  }`}
`

const LabelActive = ({ forq, text, isActive }) => {
  return (
    <LabelActiveS isActive={isActive} htmlFor={forq}>
      {text}
    </LabelActiveS>
  )
}

export const AuthInputUI = ({
  text,
  type = "text",
  AlignI = "center",
  inputSwitch = true,
  startValue,
  name,
  togglestartValue,
  value,
  handleChange = false,
  pattern,
  title,
  labelT,
  areaRequired
}: any) => {
  const { isMobile } = useDevice()
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  const [labelLength, setLabelLength] = useState(false)

  const [InputText, SetInputText] = useState(`${startValue}`)

  const checkLabelLength = (e) => {
    const target = e.target
    SetInputText(target.value)
    target.value.length >= 1 ? setLabelLength(true) : setLabelLength(false)
  }

  useEffect(() => {
    const current = ref.current

    if (togglestartValue || current?.value.length) {
      setLabelLength(true)
      SetInputText(`${startValue}`)
    } else {
      setLabelLength(false)
      SetInputText("")
    }
  }, [togglestartValue, value])

  return (
    <AuthInputWrapper AlignI={AlignI}>
      {!isMobile && <label htmlFor={text}>{text}</label>}
      <InputWrapper labelT={labelT}>
        {inputSwitch ? (
          <input
            ref={ref}
            required
            pattern={pattern}
            title={title}
            name={name}
            value={value}
            onChange={(e) => {
              if (handleChange) handleChange(e)
              checkLabelLength(e)
            }}
            type={type}
            id={text}
          />
        ) : (
          <textarea
            ref={ref}
            required={areaRequired}
            name={name}
            onChange={(e) => {
              if (handleChange) handleChange(e)
              checkLabelLength(e)
            }}
            value={value}
            id={text}
          ></textarea>
        )}

        {isMobile && <LabelActive isActive={labelLength} text={text} forq={text} />}
      </InputWrapper>
    </AuthInputWrapper>
  )
}
