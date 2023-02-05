import { GetStaticPropsContext } from "next"
import styled from "styled-components"
import { Header } from "../components/common/header"
import { FlexOnlyCenter, media } from "../styles/style-variables"

const Wrapper = styled.div`
  min-height: 100vh;
  color: white;
  background: #27232c;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  height: 100vh;
  margin-top: -95px;
  h1 {
    font-family: ProximaNova;
    font-size: 136.146px;
    letter-spacing: 0.1em;
    font-style: normal;
    font-weight: 600;
    line-height: 159px;
  }
  p {
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
`

export default function Custom404() {
  return (
    <Wrapper>
      <Header loginShow={true} color="white"></Header>
      <Content>
        <h1>404</h1>
        <p>Страницы не существует. Проверьте введёный адрес.</p>
      </Content>
    </Wrapper>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      locales: (await import(`../locales/${locale}.json`)).default,
    },
  }
}
