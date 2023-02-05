import { useTranslations } from "next-intl"
import { useState } from "react"
import styled from "styled-components"
import { media, FlexOnlyCenter } from "../../../../../styles/style-variables"
import { PhoneSvg } from "../../../../all-svg"
import { useOnClickOutside } from "../../../../common/hooks/useOnClickOutside"

export const TableStatusBtnCircle = styled(FlexOnlyCenter)`
  padding: 10px;
  border-radius: 40px;
  border: 1px solid rgba(19, 41, 38, 0.1);
  position: relative;
  transition: var(--default-transition) linear;
  :hover {
    background: #d4d6d6;
    ${media.mobile} {
      background: unset;
    }
  }
`

const TableStatusBtnPhone = styled(TableStatusBtnCircle)``

const HiddenBox = styled.div<{ show?: boolean }>`
  background: #132926;
  border-radius: 16px;
  position: absolute;
  padding: 16px;
  background: #132926;
  width: 174px;
  transform: translateX(-100%) scale(0.5);
  opacity: 0;
  transform-origin: right center;
  left: -4px;
  color: white;
  transition: var(--fast-transition);
  visibility: hidden;
  text-align: left;
  ${({ show }) =>
    show &&
    `    opacity: 1;
  transform: translateX(-100%) scale(1);
  visibility: visible;
  z-index: 100;`};
  h3 {
    color: #899492;
  }
  a,
  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  div:last-child {
    h3 {
      margin-top: 10px;
    }
  }
`

export const TableBtnPhone = ({ phoneSender, phoneRecipient }) => {
  const t = useTranslations("Bag");
  const [isModalOpen, setModalOpen] = useState(false)

  const ref = useOnClickOutside(() => setModalOpen(false))

  return (
    <TableStatusBtnPhone as="button" ref={ref} onClick={() => setModalOpen(!isModalOpen)}>
      <PhoneSvg />
      <HiddenBox show={isModalOpen}>
        <div>
          <h3>{t("Phone1")}</h3>
          <a href={`tel:${phoneSender}`}>{phoneSender}</a>
        </div>
        <div>
          <h3>{t("Phone2")}</h3>
          <a href={`tel:${phoneRecipient}`}>{phoneRecipient}</a>
        </div>
      </HiddenBox>
    </TableStatusBtnPhone>
  )
}
