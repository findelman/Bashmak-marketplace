import styled from "styled-components"
import { FlexCenter, FlexOnlyCenter, media } from "../../styles/style-variables"

const AuthBtnUIS = styled.button<{ background?: string }>`
  padding: 16px 0px;
  border-radius: 15px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  width: 100%;
  transition: var(--default-transition) linear;
  margin-top: 40px;
  background: ${({ background }) => background};
  ${media.mobile} {
    margin-top: 32px;
  }
  ${media.notMobile} {
    :hover {
      background: #b9382f;
    }
  }
`

export const AuthBtnUI = ({ handleClick, text, background = "var(--default-red)" }: any) => {
  return (
    <AuthBtnUIS onClick={handleClick} background={background}>
      {text}
    </AuthBtnUIS>
  )
}

const AddBtnUIS = styled(FlexCenter)`
  padding: 12px 16px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  background: var(--default-red);
  color: white;
  border-radius: 12px;
  transition: var(--default-transition) linear;
  ${media.notMobile} {
    :hover {
      background: #b9382f;
    }
  }
  ${media.mobile} {
    background: unset;
    color: var(--default-red);
    padding: unset;
  }
`

const AddBtnPlusUIS = styled(FlexOnlyCenter)`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background: white;
  margin-right: 10px;
  span {
    background: var(--default-red);
    width: 1.5px;
    height: 10px;
    border-radius: 10px;
    position: absolute;
    :last-child {
      transform: rotate(90deg);
    }
  }
  ${media.mobile} {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    background: var(--default-red);
    span {
      background: white;
    }
  }
`

export const AddBtnUI = ({
  text,
  handleClick,
  popUpOptionLogic = true,
  // popUpContent нужен для смены конента если на странице имеются разные попАпы
  popUpContent,
}: any) => {
  return (
    <AddBtnUIS data-popUp-content={popUpContent} onClick={handleClick} as="button">
      {popUpOptionLogic && (
        <AddBtnPlusUIS>
          <span></span>
          <span></span>
        </AddBtnPlusUIS>
      )}

      {text}
    </AddBtnUIS>
  )
}
