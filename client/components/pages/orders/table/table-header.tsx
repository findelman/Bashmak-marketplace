import { useTranslations } from "next-intl";
import styled from "styled-components";
import { JC_SB } from "../../../../styles/style-variables";

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr 1.2fr 1.3fr 1fr 1.45fr 4fr;
  gap: 20px;
  width: 100%;
  > b:last-child,
  > div:last-child {
    justify-self: flex-end;
  }
`;

export const TableHeaderS = styled(JC_SB)`
  background: #ffffff;
  border-radius: var(--default-border-radius);
  padding: 16px;
  b {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  p {
    color: #899593;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
`;

const TableHeaderItem = styled.p``;

export const TableHeader = ({ checkActiveTab,sum }: any) => {
  const t = useTranslations("Table");

  return (
    <>
      <TableHeaderS>
        <TableGrid>
          <TableHeaderItem>№</TableHeaderItem>
          <TableHeaderItem>{t("HeaderText1")}</TableHeaderItem>
          <TableHeaderItem>
            {checkActiveTab ? t("HeaderText2") : t("HeaderText3")}
          </TableHeaderItem>
          <TableHeaderItem>{t("HeaderText4")}</TableHeaderItem>
          <TableHeaderItem>{t("HeaderText5")}</TableHeaderItem>
          <TableHeaderItem>
            {checkActiveTab ? t("HeaderText6") : t("HeaderText7")}
          </TableHeaderItem>
          <b>{t("HeaderText8")} {sum} ₸</b>
        </TableGrid>
      </TableHeaderS>
    </>
  );
}
