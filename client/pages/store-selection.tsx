import { GetStaticPropsContext } from "next"
import Head from "next/head"
import Router from "next/router"
import { useEffect } from "react"
import styled from "styled-components"

import { Header } from "../components/common/header"
import { getLocalStorageValue } from "../components/common/utils/getLocalStorageValue"
import { ContentText } from "../components/pages/store-selection/content-text"
import { SearchBox } from "../components/pages/store-selection/search-box"
import { _getCityList } from "../http/cityApi"
import { media } from "../styles/style-variables"

const Wrapper = styled.div`
  background: #27232c;
  min-height: 100vh;
  position: relative;
  ${media.mobile} {
    background: #1a1522;
  }
`

const RectangleBg = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  background: #1a1521;
  clip-path: ellipse(62% 95% at 38% 50%);
  ${media.mobile} {
    width: 100%;
    clip-path: unset;
    /* фиксированная чтобы градиент не сползал */
    height: 713px;
    background: radial-gradient(
      255.59% 82.4% at 50% 72.96%,
      #1a1521 78.39%,
      #27232c 78.49%,
      #27232c 98.44%
    );
  }
`

const Content = styled.div`
  position: relative;
  padding: 0px 3%;
  margin-top: 68px;
  ${media.mobile} {
    margin-top: 32px;
  }
`

const Flex = styled.div`
  display: flex;
  max-width: 1266px;
  margin: 0 auto;
  @media screen and (max-width: 950px) {
    flex-flow: wrap;
  }
`
// Как я могу отслеживать действия пользователя на сайте ?
export default function StoreSelection() {
  return (
    <>
      <Head>
        <title>Выбор магазина | Flower app</title>
      </Head>
      <Wrapper>
        <RectangleBg></RectangleBg>
        <Header color={"white"} />
        <Content>
          <Flex>
            <ContentText />
            <SearchBox />
          </Flex>
        </Content>
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
