import $api from "../../http/api-manipulation"
import { GetStaticPropsContext } from "next"
import styled from "styled-components"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useProfile } from "../../store/hooks/useProfile"
import { FlexCenter, media } from "../../styles/style-variables"
import {
  LogoSvg,
  OrdersSvg,
  AnalyticsSvg,
  SettingSvg,
  EmployeesSvg,
  ProductsSvg,
  LogOutSvg,
  BookSvg,
  BubbleSvg,
  BulidingSvg,
  ArrowSvg,
} from "../all-svg"

import { useOnClickOutside } from "./hooks/useOnClickOutside"
import axios from "axios"

const Wrapper = styled.div<{ mobile?: boolean }>`
  border-right: 1px solid #3c3941;
  padding: 24px 8px;
  max-width: 238px;
  width: 100%;
  max-height: calc(100vh - 24px);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: var(--default-transition) linear;
  > a:first-child {
    margin-left: 15px;
  }

  @media screen and (max-width: 1120px) {
    position: fixed;
    background: #27232c;
    height: 100vh;
    max-height: unset;
    transform: translateX(-100%);
  }
  ${media.mobile} {
    transform: translateX(100%);
    right: 0;
  }
  ${({ mobile }) => mobile && "transform: unset !important; "};
`

const NavLinkS = styled(FlexCenter)<{ isActive?: boolean }>`
  padding: 12px 16px;
  transition: var(--default-transition) linear;
  border-radius: 16px;
  color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  background: ${({ isActive }) => isActive && "#3C3941"};
  :hover {
    background: #322e37;
  }
  svg {
    margin-right: 10px;
  }
`

const Links = styled.div`
  margin-top: 33px;
  :last-child {
    margin-top: auto;
  }
`

const NavLink = ({ href, text, svg, children, handleClick, LinkComponent = Link }: any) => {
  const router = useRouter()
  const { pathname } = router

  return (
    <LinkComponent onClick={handleClick} href={href}>
      <NavLinkS isActive={href === pathname}>
        {svg}
        {text}
        {children}
      </NavLinkS>
    </LinkComponent>
  )
}

const HiddenBox = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 12px;
  background: white;
  left: 16px;
  top: 0;
  transform: translateY(-100%);
  ${media.mobile} {
    left: 0;
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

export const Navigation = ({ headerMobile, handleClick }: any) => {
  const router = useRouter()
  const { email } = useProfile()
  const t = useTranslations("Navigation")
  const [showHidden, setShowHidden] = useState(false)
  const l = useTranslations("Langs")

  const { pathname, asPath, query } = router
  const ref: any = useOnClickOutside(() => setShowHidden(false))

  const ItemClick = (e) => {
    const targetDataLang = e.target.dataset.lang
    console.log(targetDataLang)
    localStorage.setItem("lang", targetDataLang)
    router.push({ pathname, query }, asPath, { locale: targetDataLang })

    // axios.post("auth/profile/edit", { language: targetDataLang }).finally(() => {
    setTimeout(() => {
      router.reload()
    }, 1000)
    // })
  }

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

  return (
    <Wrapper mobile={headerMobile}>
      <Link href="/">
        <LogoSvg />
      </Link>
      <Links>
        <NavLink
          handleClick={handleClick}
          svg={<OrdersSvg />}
          text={t("Text1")}
          href={"/crm/orders"}
        />
        <NavLink
          handleClick={handleClick}
          svg={<AnalyticsSvg />}
          text={t("Text2")}
          href={"/crm/analytics"}
        />
        <NavLink
          handleClick={handleClick}
          svg={<ProductsSvg />}
          text={t("Text3")}
          href={"/crm/products"}
        />
        <NavLink
          handleClick={handleClick}
          svg={<EmployeesSvg />}
          text={t("Text4")}
          href={"/crm/employees"}
        />
        <NavLink handleClick={handleClick} svg={<SettingSvg />} text={t("Text5")} href={""} />
      </Links>
      <Links>
        <NavLink handleClick={handleClick} svg={<BulidingSvg />} href={""}>
          <div>
            <p>{t("Text6")}</p>
            <b>{t("Text7")}</b>
          </div>
        </NavLink>
        <NavLink handleClick={handleClick} svg={<BubbleSvg />} href={""}>
          <div>
            <p>{t("Text8")}</p>
            <b>{email ? email : "Lepestok@gmail.com"}</b>
          </div>
        </NavLink>
        <div
          ref={ref}
          onClick={() => {
            setShowHidden((e) => !e)
          }}
        >
          <NavLink svg={<BookSvg />} text={t("Text9")} LinkComponent={"div"}>
            {showHidden && (
              <HiddenBox>
                {locales2.map((item, key) => {
                  return (
                    <LangItem data-lang={item.key} key={key} onClick={ItemClick}>
                      {item.text}
                    </LangItem>
                  )
                })}
              </HiddenBox>
            )}
            <ArrowSvg rotate={showHidden} style={"8px"} color={"white"} />
          </NavLink>
        </div>
        <NavLink
          handleClick={() => {
            router.push("/")
            localStorage.setItem("token", "")
          }}
          svg={<LogOutSvg />}
          text={t("Text10")}
          href={""}
        />
      </Links>
    </Wrapper>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      locales: (await import(`../../locales/${locale}.json`)).default,
    },
  }
}
