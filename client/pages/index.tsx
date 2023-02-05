import axios from "axios"
import { GetStaticPropsContext } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Header } from "../components/common/header"
import { AuthBtnUI } from "../components/UI-kit/buttonsU"
import { AuthInputUI } from "../components/UI-kit/inputs"
import { _LogIn, _ResetPass } from "../http/authAPI"

import { media } from "../styles/style-variables"

const Wrapper = styled.div`
  background: white;
  height: 100vh;
  h1 {
    font-weight: 600;
    font-size: 48px;
    line-height: 56px;
    margin-bottom: 32px;
    br {
      display: none;
    }
  }
  p {
    font-weight: 500;
  }
  ${media.mobile} {
    h1 {
      font-weight: 700;
      font-size: 32px;
      line-height: 38px;
    }
  }
`

const Main = styled.div`
  text-align: center;
  ${media.mobile} {
    margin-top: 40px;

    padding: 0px 16px;
    text-align: left;
  }
`

const MainContent = styled.form`
  max-width: 396px;
  margin: 0 auto;
  ${media.mobile} {
    max-width: 100%;
  }
`

 const ChangeContent = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  margin-top: 48px;
  transition: var(--default-transition) linear;
  ${media.mobile} {
    margin-top: 64px;
  }
  :hover {
    opacity: 0.5;
  }
`
const Error = styled.p`
  margin: 14px 0px -18px;
  color: red;
`

export default function Home() {
  const t = useTranslations("")
  const router = useRouter()
  const dispatch = useDispatch()

  const [isLogin, SetisLogin] = useState(true)
  const [resetPass, SetresetPass] = useState(false)

  const [loginData, SetloginData] = useState({})

  const toggleIsLogin = () => {
    SetisLogin(!isLogin)
    SetloginData({})
    SetError("")
  }

  const [error, SetError] = useState("")

  const BtnClick = (e) => {
    e.preventDefault()
    if (isLogin) {
      _LogIn(loginData, router, dispatch, SetError,t("Main.Error1"))
    }
    if (!isLogin && !resetPass) {
      _ResetPass(loginData).then((resp) => {
        console.log(resp)
        if (resp?.status === 201) {
          SetError("")
          SetresetPass(true)
          SetloginData({})
        } else {
          SetError(t("Main.Error2"))
        }
      })
    }
    if (!isLogin && resetPass) {
      SetisLogin(true)
      SetresetPass(false)
      SetloginData({})
    }
  }

  const _SetloginData = (e) => {
    // При смене контента может возникнуть баг по этому нужна проверка на e
    if (e) {
      const target = e.target
      const { name, value } = target
      SetloginData({ ...loginData, [name]: value })
    }
    console.log(loginData)
  }

  return (
    <>
      <Head>
        <title>Добро пожаловать | Flower app</title>
      </Head>

      <Wrapper>
        <Header />
        <Main>
          <h1>
            {isLogin ? (
              <>{t("Main.LogIn")}</>
            ) : !isLogin && !resetPass ? (
              <>{t("Main.ResetAcc")}</>
            ) : (
              <>{t("Main.ResetPass")}</>
            )}
          </h1>
          <MainContent onSubmit={BtnClick}>
            {isLogin ? (
              <>
                <AuthInputUI
                  handleChange={_SetloginData}
                  name={"login"}
                  type={"email"}
                  text={t("Main.Text1")}
                />
                <AuthInputUI
                  handleChange={_SetloginData}
                  name={"password"}
                  type="password"
                  text={t("Main.Text2")}
                />
              </>
            ) : !isLogin && !resetPass ? (
              <AuthInputUI
                handleChange={_SetloginData}
                name={"email"}
                type={"email"}
                text={t("Main.Text3")}
              />
            ) : (
              <p> {t("Main.EmailSend")}</p>
            )}
            <Error>{error}</Error>
            <AuthBtnUI
              background={"var(--default-red)"}
              text={
                isLogin ? t("Main.Btn1") : !isLogin && !resetPass ? t("Main.Btn2") : t("Main.Btn3")
              }
            />
            {!resetPass && (
              <ChangeContent onClick={toggleIsLogin}>
                {isLogin ? t("Main.Footer1") : t("Main.Footer2")}
              </ChangeContent>
            )}
          </MainContent>
        </Main>
      </Wrapper>
    </>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      locales: (await import(`../locales/${locale}.json`)).default,
    },
  }
}
