// import "../styles/fonts.css";
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import store from "../store"
import { PageNavigation } from "../components/common/page-navigation"
import { useRouter } from "next/router"
import Crm from "./crm"
import IsMobile from "../components/common/isMobile"
import { GlogalStyle } from "../styles/GlogalStyle"
import { useVh } from "../store/hooks/useVh"
import { GetStaticPropsContext } from "next"
import { NextIntlProvider } from "next-intl"
import '../styles/fonts.css'


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname, asPath, query } = router
  useVh()

  return (
    <NextIntlProvider messages={pageProps.locales}>
      <Provider store={store}>
        <IsMobile>
          <GlogalStyle />
          <PageNavigation />
          {pathname.includes("crm") ? (
            <Crm>
              <Component {...pageProps} />
            </Crm>
          ) : (
            <Component {...pageProps} />
          )}
        </IsMobile>
      </Provider>
    </NextIntlProvider>
  )
}

