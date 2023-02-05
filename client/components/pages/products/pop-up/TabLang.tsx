import { useState } from "react"
import styled from "styled-components"
import { media } from "../../../../styles/style-variables"

export const TabWrapper = styled.div`
  border-bottom: 1px solid #e2e2e2;
  margin: 12px 0px 32px;
  display: flex;
  ${media.mobile} {
    margin: 12px 0px 0px;
  }
`

export const TabItemS = styled.div<{ isActive?: boolean }>`
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  line-height: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ isActive }) => (isActive ? "black" : "transparent")};
  color: ${({ isActive }) => (isActive ? "black" : "#A0AAA8")};
  /* Для полоски */
  margin-bottom: -1px;
  :not(:first-child) {
    margin-left: 24px;
  }
  transition: var(--default-transition) linear;
  :hover {
    color: black;
  }
`

const TabItem = ({ isActive, text, setText }) => {
  return (
    <TabItemS
      onClick={() => {
        setText(text)
      }}
      isActive={isActive === text}
    >
      {text}
    </TabItemS>
  )
}

export const TabLang = ({activeTab,SetActive}) => {

  return (
    <TabWrapper>
      <TabItem isActive={activeTab} setText={SetActive} text={"Русский"} />
      <TabItem isActive={activeTab} setText={SetActive} text={"English"} />
    </TabWrapper>
  )
}
