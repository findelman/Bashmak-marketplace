import styled from "styled-components"
import { useDevice } from "../../store/hooks/useDevice"
import { media } from "../../styles/style-variables"

const TabS = styled.button<{ isActive?: boolean }>`
  padding: 12px 16px;
  border: 1px solid ${({ isActive }) => (isActive ? "#ffffff" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 12px;
  color: white;
  transition: var(--default-transition) linear;
  ${media.notMobile} {
    :hover {
      background: white;
      color: black;
    }
  }
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  ${media.mobile} {
    padding: 8px 16px;
  }
`

export const Tab = ({ text, SetActiveTab, isActive, count,handleClick }: any) => {
  
  const {isMobile} = useDevice()

  return (
    <>
      <TabS
        onClick={() => {
         if(handleClick) handleClick()
          SetActiveTab(text)
        }}
        isActive={isActive === text}
      >
        {text} {!isMobile && count}
      </TabS>
    </>
  )
}
