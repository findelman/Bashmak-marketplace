import { GetStaticPropsContext } from "next"
import { useState } from "react"
import styled from "styled-components"

import { Header } from "../../components/common/header"
import { Navigation } from "../../components/common/navigation"

import { useDevice } from "../../store/hooks/useDevice"
import { media } from "../../styles/style-variables"

const Wrapper = styled.div`
  min-height: 100vh;
  background: #27232c;
  display: flex;
  @media screen and (max-width: 1120px) {
    flex-direction: column;
  }
`

const ContentWrapper = styled.div`
  padding: 40px 28px;
  position: relative;
  width: 100%;
  ${media.mobile} {
    padding: unset;
  }
`

export default function Crm({ children }: { children: React.ReactNode }) {
  const { isMobile, width } = useDevice()

  const [navigationShow, SetnavigationShow] = useState<boolean>(false)

  return (
    <Wrapper>
      <Navigation
        headerMobile={width < 1120 && navigationShow}
        handleClick={() => {
          SetnavigationShow(false)
        }}
      />
      {width < 1120 && (
        <Header
          color="white"
          hamburgerShow={true}
          navigationShow={navigationShow}
          handleClick={() => {
            SetnavigationShow(!navigationShow)
          }}
        />
      )}
      <ContentWrapper>{children}</ContentWrapper>
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
