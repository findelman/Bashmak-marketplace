import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { io } from "socket.io-client"
import styled from "styled-components"
import $api from "../../../../http/api-manipulation"
import { useOrders } from "../../../../store/hooks/useOrders"
import { closeChat } from "../../../../store/slices/orders"
import {
  CustomScrollText,
  FlexCenter,
  FlexOnlyCenter,
  media,
} from "../../../../styles/style-variables"
import { InputUpload } from "../../products/pop-up/AddPhoto"
import { ChatArrowSvg, ChatGalerySvg, ChatSvg } from "./ChatSvg"
import { useSocket } from "./useSocket"

const Wrapper = styled.div`
  width: 320px;
  height: 568px;
  position: fixed;
  z-index: 100000;
  bottom: 21px;
  right: 19px;
  background: #e1eeec;
  box-shadow: 0px 24px 32px rgba(0, 0, 0, 0.24);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  ${media.mobile} {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: unset;
  }
`

const Header = styled.div`
  background: #ffffff;
  padding: 19px 16px;
  box-shadow: 0px 16px 32px rgba(86, 75, 45, 0.12);
  border-radius: 0px 0px 16px 16px;
  position: relative;
  svg {
    left: 16px;
    top: 25px;
    position: absolute;
    cursor: pointer;
    z-index: 100;
  }
  text-align: center;
`

const HeaderText = styled.div`
  text-align: center;
  b {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #132926;
    opacity: 0.4;
  }
`

const Body = styled.div`
  padding: 12px;
  overflow-y: scroll;
  ${CustomScrollText}
  scroll-behavior: smooth;
`

const Messages = styled.div<{ sender?: any }>`
  background: ${({ sender }) => (sender ? "#ffffff" : "#132926")};
  color: ${({ sender }) => (sender ? "black" : "#ffffff")};
  border-radius: ${({ sender }) => (sender ? "16px 16px 16px 8px" : "16px 16px 8px 16px;")};
  width: 80%;
  padding: 12px 12px 8px;
  margin-bottom: 12px;
  overflow-wrap: anywhere;
  img {
    width: 100%;
    height: 100%;
  }
  ${({ sender }) => !sender && `margin-left: auto`}
`
const Footer = styled.div`
  background: #ffffff;
  border-radius: 16px 16px 0px 0px;
  padding: 12px 12px 24px;
  margin-top: auto;
  display: flex;
  align-items: flex-end;
  > svg {
    margin-bottom: 5px;
    cursor: pointer;
  }
  label svg {
    cursor: pointer;
  }
`
const ImgWrapper = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`

const InputWrapper = styled.div`
  background: #f4f4f4;
  border-radius: 24px;
  width: 100%;
  margin-left: 12px;
  padding: 12px 16px;
  display: flex;
  input {
    width: 100%;
    background: transparent;
  }
`

const SendBtn = styled(FlexOnlyCenter)`
  background: #d74c42;
  min-width: 32px;
  height: 32px;
  border-radius: 100%;
`

const DateS = styled.small`
  display: block;
  opacity: 0.4;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
`

export const ChatPopUp = () => {
  const t = useTranslations("Chat")
  const dispatch = useDispatch()
  const body = useRef<any>(null)

  const {
    messages,
    inputValue,
    setInputValue,
    formatCreateDate,
    changeFile,
    chatId,
    handleKeyPress,
  } = useSocket(body)

  return (
    <Wrapper>
      <Header>
        <div
          onClick={() => {
            dispatch(closeChat())
          }}
        >
          <ChatSvg />
        </div>
        <HeaderText>
          <b>{t("Title")}</b>
          <p>
            {t("Order")} №{chatId}
          </p>
        </HeaderText>
      </Header>
      <Body ref={body}>
        {messages &&
          messages.map((item) => (
            <Messages sender={item.sender.type === "customer"} key={item.id}>
              {item.text}
              {item && item.files && item.files.length !== 0 && (
                <ImgWrapper>
                  <img src={item.files[0].url} />
                </ImgWrapper>
              )}
              <DateS>{formatCreateDate(item.create_datetime)}</DateS>
            </Messages>
          ))}
      </Body>
      <Footer>
        <label htmlFor="file-loader-button">
          <ChatGalerySvg />
        </label>
        <InputWrapper>
          <input
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            placeholder={t("Send")}
            onKeyPress={handleKeyPress}
            type="text"
            value={inputValue}
          />
          {!!inputValue.length && (
            <SendBtn onClick={() => handleKeyPress({ key: "Enter" })} as="button">
              <ChatArrowSvg />
            </SendBtn>
          )}
        </InputWrapper>
      </Footer>

      <InputUpload id="file-loader-button" type="file" onChange={changeFile} />
    </Wrapper>
  )
}
