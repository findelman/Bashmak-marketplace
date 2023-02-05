import styled from "styled-components";

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const JC_SB = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexOnlyCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const media = {
  mobile: `@media screen and (max-width: 890px)`,
  // Не применяем :hover на мобилках ↓
  notMobile: `@media screen and (min-width: 890px)`,
};

export const CustomScroll = styled.div`
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #c4c8c8;
  }
`;

// Точечное импортирование через ${CustomScrollText} когда у блока не объявлен styled.div``
export const CustomScrollText = `
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #c4c8c8;
  }
`;

// Форматируем сумму
export const SumFormat = /(\d)(?=(\d{3})+(?!\d))/g

