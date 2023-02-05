import { useTranslations } from "next-intl"
import { useRouter } from "next/router"
import { useState } from "react"
import styled from "styled-components"
import $api from "../../http/api-manipulation"
import { useDevice } from "../../store/hooks/useDevice"
import { FlexCenter, media } from "../../styles/style-variables"
import { ArrowSvg } from "../all-svg"
import { useOnClickOutside } from "./hooks/useOnClickOutside"

const Wrapper = styled(FlexCenter)`
  color: black;
  margin-right: 32px;
  font-weight: 500;
  font-size: 16px;
  position: relative;
  line-height: 24px;
  svg {
    margin-left: 8px;
    width: 11px;
  }
  > p {
    transition: 300ms linear;
    :hover {
      filter: brightness(0.8);
    }
  }
  ${media.mobile} {
    margin-right: unset;
  }
`

const HiddenBox = styled.div<{ show?: boolean }>`
  border-radius: 12px;
  filter: drop-shadow(0px 24px 32px rgba(0, 0, 0, 0.24));
  transition: var(--default-transition) linear;
  position: absolute;
  ${media.notMobile} {
    display: ${({ show }) => (show ? "block" : "none")};
    min-width: 204px;
    max-width: 304px;
    transform: translateY(100%);
  }
  width: 100%;
  background: white;
  padding: 12px;
  z-index: 10000;
  margin-top: 13px;
  bottom: -7px;
  ${media.mobile} {
    position: fixed;
    left: 0;
    background: #f3f3f3;
    border-radius: 24px 24px 0px 0px;
    padding: 0px 16px 16px;
    visibility: ${({ show }) => (show ? "visibly" : "hidden")};
    transform: translateY(${({ show }) => (show ? "0%" : "100%")});
    h2 {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      text-align: left;
      margin: 32px 0px 12px;
    }
    &:before {
      content: "";
      position: absolute;
      width: 48px;
      height: 4px;
      background: #e2e2e2;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`

const LangItem = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: black;
  text-align: left;
  padding: 8px 16px;
  ${media.mobile} {
    padding: 12px;
    border-bottom: 1px solid #dbdbdb;
  }
`

const MobileOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  left: 0;
  bottom: 0;
  opacity: 0.8;
`

const ChangeLang = () => {
  const { isMobile } = useDevice()

  const router = useRouter()
  const [show, SetShow] = useState(false)
  const { pathname, asPath, query } = router
  const ref: any = useOnClickOutside(() => SetShow(false))
  const t = useTranslations("Header")
  const l = useTranslations("Langs")

  const locales2 = [
    {
      text: l("RU"),
      key: "ru",
    },
    {
      text: l("KZ"),
      key: "kz",
    },
    {
      text: l("EN"),
      key: "en",
    },
  ]

  const ItemClick = (e) => {
    const targetDataLang = e.target.dataset.lang
    localStorage.setItem("lang", targetDataLang)

    
    router.push({ pathname, query }, asPath, { locale: targetDataLang })
    $api.patch("auth/profile/edit", { language: targetDataLang.toUpperCase() }).finally(() => {
      setTimeout(() => {
        router.reload()
      }, 1000)
    })
  }

  return (
    <Wrapper
      ref={ref}
      as="button"
      onClick={() => {
        SetShow((e) => !e)
      }}
    >
      <FlexCenter as="p">
        {t("ChangeLang")}
        {!isMobile && <ArrowSvg rotate={show} />}
      </FlexCenter>

      <HiddenBox show={show}>
        {isMobile && <h2>{t("ChangeLang")}</h2>}
        {locales2.map((item, key) => {
          return (
            <LangItem data-lang={item.key} key={key} onClick={ItemClick}>
              {item.text}
            </LangItem>
          )
        })}
      </HiddenBox>
      {show && isMobile && <MobileOverlay></MobileOverlay>}
    </Wrapper>
  )
}

export default ChangeLang
