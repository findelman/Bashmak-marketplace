import { GetStaticPropsContext } from "next"
import { useTranslations } from "next-intl"
import Head from "next/head"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FormatSum } from "../../components/common/utils/FormatSum"
import { ChartBox } from "../../components/pages/analytics/ChartBox"
import { BandChart, LineChart } from "../../components/pages/analytics/Charts"
import { chartApi } from "../../fakeapi/api"
import $api from "../../http/api-manipulation"
import { useDevice } from "../../store/hooks/useDevice"
import { media } from "../../styles/style-variables"

const Wrapper = styled.div`
  color: white;
  overflow: hidden;
  /* Чарты багают скролл */
  @media screen and (min-width: 1120px) {
    width: calc(100vw - 311px);
  }
  h1 {
    font-weight: 600;
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 32px;
    font-family: ProximaNova;
  }
  ${media.mobile} {
    width: 100%;
    padding: 24px 16px;
    h1 {
      margin-bottom: 24px;
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid: auto / repeat(2, 1fr);
  gap: 12px;
  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`

export default function Analytics() {
  const t = useTranslations("Analytics")
  const { isMobile } = useDevice()
  const [chartData, setchartData] = useState<any>([])

  useEffect(() => {
    $api.get(`analytics/order/revenue`).then((resp) => {
      setchartData(resp.data)
      console.log(resp.data)
    })
  }, [])

  let firstObject = {
    result: [
      {
        date: "2022-11-28",
        revenue: 1000,
      },
      {
        date: "2022-11-29",
        revenue: 4000,
      },
      {
        date: "2022-11-30",
        revenue: 44000,
      },
      {
        date: "2022-12-04",
        revenue: 1000,
      },
      {
        date: "2022-12-05",
        revenue: 18000,
      },
      {
        date: "2022-12-06",
        revenue: 6000,
      },
      {
        date: "2022-12-07",
        revenue: 1000,
      },
      {
        date: "2022-12-18",
        revenue: 3000,
      },
      {
        date: "2022-12-19",
        revenue: 1000,
      },
    ],
    total: 79000,
  }
  let secondObject = {
    results: [
      {
        date: "2022-11-29",
        orders_count: {
          cancelled: 1,
          finished: 0,
          all: 1,
        },
      },
      {
        date: "2022-11-30",
        orders_count: {
          cancelled: 0,
          finished: 4,
          all: 4,
        },
      },
      {
        date: "2022-12-01",
        orders_count: {
          cancelled: 0,
          finished: 8,
          all: 8,
        },
      },
      {
        date: "2022-12-05",
        orders_count: {
          cancelled: 0,
          finished: 1,
          all: 1,
        },
      },
      {
        date: "2022-12-06",
        orders_count: {
          cancelled: 0,
          finished: 18,
          all: 18,
        },
      },
      {
        date: "2022-12-07",
        orders_count: {
          cancelled: 0,
          finished: 6,
          all: 6,
        },
      },
      {
        date: "2022-12-08",
        orders_count: {
          cancelled: 0,
          finished: 1,
          all: 1,
        },
      },
      {
        date: "2022-12-19",
        orders_count: {
          cancelled: 0,
          finished: 3,
          all: 3,
        },
      },
      {
        date: "2022-12-20",
        orders_count: {
          cancelled: 0,
          finished: 1,
          all: 1,
        },
      },
    ],
  }
// преоброзовываем два объекта в один, для корректного отображения данных в чартах 
  let newObject: any = { result: [] }
  secondObject.results.forEach((result) => {
    let date = result.date
    let match = firstObject.result.find((x) => x.date === date)
    let revenue = match ? match.revenue : 0
    newObject.result.push({ date, revenue, ...result.orders_count })
  })
  newObject.total = firstObject.total
  console.log(newObject)

  return (
    <>
      <Head>
        <title>{t("Title")} | Flower app</title>
      </Head>
      <Wrapper>
        <h1>{t("Title")}</h1>
        <Grid>
          {chartData && (
            <ChartBox
              total={FormatSum(chartData.total)}
              title={t("Text1")}
              chart={
                <LineChart data={chartData?.results} dataKey="revenue" dotR={isMobile ? 5 : 10} />
              }
            />
          )}
          {chartData && (
            <ChartBox
              total={FormatSum(chartData.total)}
              title={t("Text1")}
              chart={
                <LineChart data={chartData?.results} dataKey="revenue" dotR={isMobile ? 5 : 10} />
              }
            />
          )}
          <ChartBox
            total={"0"}
            title={t("Text1")}
            chart={<LineChart data={chartApi} dataKey="amt" />}
          />
          <ChartBox total={"0"} title={t("Text1")} chart={<BandChart data={chartApi} />} />
        </Grid>
      </Wrapper>
    </>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      locales: (await import(`../../locales/${locale}.json`)).default,
    },
  }
}
