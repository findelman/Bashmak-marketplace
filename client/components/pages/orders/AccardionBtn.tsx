import { forwardRef, useState } from "react"
import styled from "styled-components"
import { ArrowSvg, NoteSvg } from "../../all-svg"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import ru from "date-fns/locale/ru"
import { FlexCenter, media } from "../../../styles/style-variables"
import { useOnClickOutside } from "../../common/hooks/useOnClickOutside"
import { useTranslations } from "next-intl"
export const HoverEl = styled.div``

export const AccardionBtnHover = `
  .HoverEl {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border-radius: 12px;
  transition: var(--default-transition) linear;
  padding: 12px 16px;
  display: flex;
  gap: 8px;
  background: white;
  align-items: center;
  :hover {
    filter: brightness(0.9);
  }
}
`

export const DefaultBtnSetting = styled.button<{ rotateArrow?: boolean }>`
  position: relative;
  ${AccardionBtnHover}
  svg:last-child {
    transition: var(--default-transition) linear;
    ${({ rotateArrow }) => (rotateArrow ? "transform:rotate(180deg)" : "transform:rotate(0)")}
  }
`

const AnimationShadowContent = styled.div<{ showHidden?: boolean; width?: any }>`
  position: absolute;
  z-index: 100;
  bottom: -4px;
  transform-origin: bottom;
  transition: var(--fast-transition);
  width: ${({ width }) => width};
  filter: drop-shadow(0px 16px 48px rgba(0, 0, 0, 0.24));
  ${media.mobile} {
    right: 0;
  }
  ${({ showHidden }) =>
    showHidden
      ? "transform: scaleY(1) translateY(100%); visibility: visible; opacity:1;"
      : "visibility: hidden; transform: scale(0.5) translateY(100%); opacity:0;"}
`

export const StatusBtnHiddenS = styled(AnimationShadowContent)`
  min-width: 159px;
  width: calc(100% + 20px);
  background: black;
  border-radius: 12px;
  background: white;
  padding: 12px 0px;
  button {
    width: 100%;
    padding: 8px 16px;
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    transition: var(--default-transition) linear;
    border-radius: 12px;
    :hover {
      background: #e8eaea;
    }
  }
`

const StatusBtnS = styled.button<{ hidden?: boolean }>`
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  transition: var(--default-transition) linear;
  border-radius: 12px;
  :hover {
    background: #e8eaea;
  }
  ${({ hidden }) => hidden && `display: none;`}
`

const StatusBtn = ({ text, atribute, hidden, handleClick, setText }: any) => {
  return (
    <StatusBtnS
      hidden={text === hidden}
      data-status={atribute}
      onClick={(e) => {
        handleClick(e)
        setText(text)
      }}
    >
      {text}
    </StatusBtnS>
  )
}

export const StatusBtnHidden = ({ showHidden, handleClick, setText, hidden }) => {
  const t = useTranslations("Table");

  return (
    <StatusBtnHiddenS showHidden={showHidden}>
      <StatusBtn
        setText={setText}
        handleClick={handleClick}
        atribute={""}
        hidden={hidden}
        text={t('Status1')}
      />
      <StatusBtn
        setText={setText}
        handleClick={handleClick}
        atribute={"1"}
        hidden={hidden}
        text={t('Status2')}
      />
      <StatusBtn
        setText={setText}
        handleClick={handleClick}
        atribute={"2"}
        hidden={hidden}
        text={t('Status3')}
      />
      <StatusBtn
        setText={setText}
        handleClick={handleClick}
        atribute={"3"}
        hidden={hidden}
        text={t('Status4')}
      />
    </StatusBtnHiddenS>
  )
}

// AccardionBtn
const AccardionBtnS = styled(DefaultBtnSetting)``

export const AccardionBtn = ({ text, svg, hiddenContent, handleClick, showHidden }: any) => {
  return (
    <AccardionBtnS onClick={handleClick} rotateArrow={showHidden}>
      <div className="HoverEl">
        {svg}
        {text}
        <ArrowSvg />
      </div>
      {hiddenContent}
    </AccardionBtnS>
  )
}

//  AccardionBtn end

export const StatusBtns = ({ text, handleClick }: any) => {
  const [showHidden, SetShowHidden] = useState(false)
  const [changeText, SetChangeText] = useState(text)

  return (
    <AccardionBtn
      showHidden={showHidden}
      handleClick={() => {
        SetShowHidden(!showHidden)
      }}
      text={changeText}
      hiddenContent={
        <StatusBtnHidden
          handleClick={handleClick}
          hidden={changeText}
          showHidden={showHidden}
          setText={SetChangeText}
        />
      }
    />
  )
}

const DataPickerWrapper = styled.div`
  position: relative;
  .react-datepicker__month-wrapper > div {
    padding: 6px;
  }
`

const DataPickerButton = styled(FlexCenter)<{ customStyle?: any }>`
  position: relative;
  .HoverEl {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  ${({ customStyle }) => customStyle}
`

export const DataBtn = ({ showMonthYearPicker, formatDate, btnStyle, svg, text, width }: any) => {
  const [startDate, setStartDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  const ref = useOnClickOutside(() => setIsOpen(false))

  const handleChange = (e) => {
    setIsOpen(!isOpen)
    setStartDate(e)
  }
  const handleClick = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }
  return (
    <>
      <DataPickerWrapper ref={ref}>
        <DataPickerButton as="button" customStyle={btnStyle} onClick={handleClick}>
          <div className="HoverEl">
            {svg}
            {text}
            {format(startDate, formatDate)} <ArrowSvg rotate={isOpen} />
          </div>
        </DataPickerButton>
        <AnimationShadowContent width={width} showHidden={isOpen}>
          <DatePicker
            locale={ru}
            selected={startDate}
            onChange={handleChange}
            showMonthYearPicker={showMonthYearPicker}
            inline
          />
        </AnimationShadowContent>
      </DataPickerWrapper>
    </>
  )
}
