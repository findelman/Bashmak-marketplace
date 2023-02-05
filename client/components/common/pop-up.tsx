import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useBag } from "../../store/hooks/useBag"
import { closeBag } from "../../store/slices/bagPopUp"
import { FlexOnlyCenter, media } from "../../styles/style-variables"

const PopUpWrapper = styled(FlexOnlyCenter)<{
  show?: boolean
  mobileCenter?: boolean
}>`
  background: #27232cdb;
  height: 100vh;
  z-index: 1000000000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: var(--fast-transition);
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  ${media.mobile} {
    overflow: scroll;
    background: ${({ mobileCenter }) => (mobileCenter ? "#27232cdb" : "white")};
    height: 100vh;
    align-items: ${({ mobileCenter }) => (mobileCenter ? "center" : "flex-start")};
  }
`

const ClosePopUp = styled(FlexOnlyCenter)<{ customStyle }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
  right: -50px;
  top: 0px;
  transform: translateY(-100%);
  background: white;
  transition: var(--default-transition) linear;
  :hover {
    opacity: 0.8;
  }
  span {
    width: 12px;
    height: 1.5px;
    background: #000;
    position: absolute;
    transform: rotate(45deg);
    :last-child {
      transform: rotate(-45deg);
    }
  }
  ${media.mobile} {
    right: 12px;
    transform: unset;
    width: 32px;
    height: 32px;
    top: 10px;
    background: var(--default-red);
    span {
      width: 14px;
      background: white;
    }
    ${({ customStyle }) => customStyle}
  }
`

const PopUpContainer = styled.div<{ height?: any; mobileCenter }>`
  width: fit-content;
  position: relative;
  height: ${({ height }) => height};
  ${media.mobile} {
    width: 100%;
    height: ${({ mobileCenter }) => (mobileCenter ? "" : "")};
  }
`

export const PopUp = ({
  children,
  height,
  togglePopUp,
  SetPopUpShow,
  mobileCenter,
  customStyle,
}: any) => {
  const dispatch = useDispatch()
  const { show } = useBag()
  return (
    <>
      {
        <PopUpWrapper mobileCenter={mobileCenter} show={togglePopUp || show}>
          <PopUpContainer mobileCenter={mobileCenter} height={height}>
            <ClosePopUp
              customStyle={customStyle}
              onClick={() => {
                document.body.style.overflow = "auto"
                if (SetPopUpShow) SetPopUpShow(false)
                dispatch(closeBag())
              }}
              as="button"
            >
              <span></span>
              <span></span>
            </ClosePopUp>
            {children}
          </PopUpContainer>
        </PopUpWrapper>
      }
    </>
  )
}
