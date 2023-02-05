import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import $api from "../../http/api-manipulation"
import { useDevice } from "../../store/hooks/useDevice"
import { FlexCenter, FlexOnlyCenter, JC_SB, media } from "../../styles/style-variables"
import { ChangeLangSvg, LogoSvg } from "../all-svg"

const HeaderS = styled.div<{ color?: string }>`
  font-family: "Lato", sans-serif;
  position: relative;
  color: ${({ color }) => color};
  a {
    ${({ color }) => color};
  }
`

const Container = styled(JC_SB)`
  padding: 33px 3%;
  ${media.mobile} {
    padding: 16px 20px;
  }
`

const LogoBox = styled(FlexCenter)`
cursor: pointer;
  p {
    margin-top: 5px;
    margin-left: 12px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  :last-child {
    cursor: pointer;
    a {
      margin-left: 32px;
    }
  }
  ${media.mobile} {
    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
`

const Hamburger = styled(FlexOnlyCenter)<{ isActive?: boolean }>`
  margin-left: 46px;
  display: flex;
  flex-direction: column;
  gap: 7.5px;
  height: 15px;
  position: relative;
  z-index: 10000;
  ${media.mobile} {
    position: ${({ isActive }) => (isActive ? "fixed" : "relative")};
  }
  span {
    width: 20px;
    border-radius: 24px;
    height: 1.4px;
    display: block;
    background: white;
    transition: var(--default-transition) linear;
    ${({ isActive }) =>
      isActive
        ? `:nth-child(1) {top: 7px; transform:rotate(-45deg); position: absolute;
    } :nth-child(2) { transform: scale(0)} :nth-child(3) {
      transform:rotate(45deg);
      position: absolute;
      bottom: 7px;
    }`
        : `:nth-child(1) {
          top: 0;
      transform:rotate(0); position: absolute;
    } :nth-child(2) { transform: scale(1)} :nth-child(3) {
      transform:rotate(0);
      position: absolute;
      bottom: 0;
    }`}
  }
`

export const Header = ({
  color = "black",
  loginShow = false,
  hamburgerShow = false,
  handleClick,
  navigationShow,
}: any) => {
  const { isMobile } = useDevice()
  const router = useRouter()
  const [lang, setLang] = useState("ru")
  const t = useTranslations("Main")
  useEffect(() => {
    let lang = localStorage.getItem("lang") || localStorage.setItem("lang", "ru")
    if (router.pathname === "/") {
      router.push(`${lang}`)
    }
  }, [])
  const { pathname, asPath, query } = router
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
    <>
      <HeaderS color={color}>
        <Container>
          <LogoBox
            onClick={() => {
              router.push("/")
            }}
          >
            <LogoSvg />
            {!isMobile && <p>{t("Shop")}</p>}
          </LogoBox>
          <LogoBox>
            {!isMobile && <ChangeLangSvg />}
            {router.locale === "en" ? (
              <p onClick={ItemClick} data-lang="ru">
                Russian
              </p>
            ) : (
              <p onClick={ItemClick} data-lang="en">
                English
              </p>
            )}
            {loginShow && (
              <Link href="/">
                <p>{t("Login1")}</p>
              </Link>
            )}
            {hamburgerShow && (
              <Hamburger isActive={navigationShow} onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
              </Hamburger>
            )}
          </LogoBox>
        </Container>
      </HeaderS>
    </>
  )
}
