import styled from "styled-components";
import { media } from "../../../styles/style-variables";

const HeaderTabItemS = styled.button<{ isActive?: boolean }>`
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  color: ${({ isActive }) => (isActive ? "#FFFFFF" : "#9D93AA")};
  font-family: ProximaNova;
  transition: var(--default-transition) linear;
  ${media.notMobile} {
    :hover {
      color: #a0aaa8;
    }
  }
  ${media.mobile} {
    font-size: 32px;
    line-height: 40px;
  }
`;

export const HeaderTabItem = ({ text, SetActiveTab, isActive }: any) => {
  return (
    <>
      <HeaderTabItemS
        onClick={() => {
          SetActiveTab(text);
        }}
        isActive={isActive === text}
      >
        {text}
      </HeaderTabItemS>
    </>
  );
};
