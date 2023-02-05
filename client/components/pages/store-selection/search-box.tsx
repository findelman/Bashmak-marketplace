import styled, { keyframes } from "styled-components"
import { StoreSelectionApi } from "../../../fakeapi/api"
import { media, FlexCenter, JC_SB, CustomScrollText } from "../../../styles/style-variables"
import { SearchSvgF, CloseSvg } from "../../all-svg"
import { useEffect, useState } from "react"
import $api, { $apiNC } from "../../../http/api-manipulation"
import { useTranslations } from "next-intl"
import Link from "next/link"
import axios from "axios"

const SearchBoxS = styled.div`
  background: #ffffff;
  border-radius: 16px;
  max-width: 746px;
  width: 100%;
  margin-left: 83px;
  overflow: hidden;
  ${media.mobile} {
    margin-left: unset;
    margin-top: 40px;
    overflow: visible;
    background: unset;
  }
`

const SearchHeader = styled(FlexCenter)<{ fixed?: boolean }>`
  width: 100%;
  padding: 19px 24px;
  border: 1px solid #0000001f;
  transition: 500ms;
  ${({ fixed }) =>
    fixed
      ? `border-radius: unset
      ;border: unset;
      margin: 0 auto; 
      right:0;    
      width: 100%; 
      background: #27232C; 
      position:fixed; 
      top: 0; left: 0; 
      ${MobileBorder} {
        border: 1px solid #534D5B;
        border-radius: 8px;
        padding: 12px 14px;
      }`
      : "position:relative;"}
  svg {
    cursor: pointer;
  }
  label {
    display: inherit;
    cursor: pointer;
  }
  input {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    ::placeholder {
      opacity: 0.4;
    }
  }
  ${media.mobile} {
    border: 1px solid #534d5b;
    border-radius: 8px;
    input {
      background: transparent;
      color: white;
    }
    padding: 14px;
    svg * {
      stroke: white;
    }
  }
`

const MobileBorder = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Close = styled.div<{ show?: any }>`
  transition: var(--default-transition);

  ${({ show }) => (show ? "visibility: visible ;opacity: 1;" : "opacity: 0; visibility: hidden;")}
  svg path {
    transition: var(--default-transition) linear;
  }
  svg:hover path {
    stroke: black;
  }
`

const SearchListWrapper = styled.div`
  padding: 16px 8px;
  max-height: 369px;
  overflow-y: scroll;
  > a:not(:last-child) div {
    border-bottom: 1px solid #0000001f;
  }
  a:hover div {
    border-bottom: 1px solid transparent;
  }
  ${CustomScrollText};
  ${media.mobile} {
    max-height: unset;
    overflow-y: unset;
  }
`

const SearchListItemS = styled(JC_SB)`
  padding: 12px 16px;
  transition: var(--fast-transition);
  cursor: pointer;
  :not(:last-child) {
    border-bottom: 1px solid #0000001f;
  }
  :hover {
    border-radius: 16px;
    background: #e8eaea;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    color: black;
    line-height: 24px;
  }
  p:not(:first-child) {
    color: #787d80;
  }
  ${media.mobile} {
    padding: 12px 0px;
    border-radius: unset;
    :not(:last-child) {
      border-bottom: 1px solid #3a3541;
    }
    color: white;
    :hover {
      background: unset;
    }
    p {
      color: white;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
`

const HeaderFlex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  svg {
    margin-right: 12px;
  }
`

const Error = styled.p`
  text-align: center;
  ${media.mobile} {
    color: white;
  }
`

const SearchListItem = ({ data }) => {
  return (
    <Link href="/crm/orders">
    <SearchListItemS
      onClick={() => {
        console.log(data.id)
        localStorage.setItem("company_id", data.id)
      }}
    >
      <p>{data.name}</p>
      <p>{data.city?.data.name}</p>
    </SearchListItemS>
    </Link>
  )
}

export const SearchBox = () => {
  const [searchData, SetSearchData] = useState<any>([])
  const [fixedSearch, SetfixedSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const t = useTranslations("Input")
  const cityFilter = (e) => {
    setSearchValue(e.target.value)
    // console.log(searchData)
  }

  // Фиксируем поиск при скролле
  useEffect(() => {
    window.onscroll = () => {
      window.pageYOffset > 427 ? SetfixedSearch(true) : SetfixedSearch(false)
    }
  }, [])

  // Обновляем данные поиска
  useEffect(() => {
    if (searchValue.trim() !== "") {
      $apiNC
        .get(`company/list?search=${searchValue}`)
        .then((resp) => {
          console.log(resp)
          SetSearchData(resp.data.companies)})
        .catch((err) => {
          console.log(err)
          SetSearchData(false)})
    } else {
      $apiNC.get("company/list").then((resp: any) => {
        SetSearchData(resp.data.companies)
      })
    }
  }, [searchValue])

  // useEffect(() => {
  //   $api.get("city/list").then((resp: any) => {
  //     SetSearchData(resp.data.result)
  //   })
  // }, [])

  useEffect(() => {
    $apiNC.get("company/list").then((resp) => {
      SetSearchData(resp.data.companies)
      console.log(resp.data.companies, "NEWW")
    })
    
    axios.get('companies').then(resp => console.log(resp,'ALLOO '))

  }, [])


  return (
    <SearchBoxS>
      <SearchHeader fixed={fixedSearch}>
        <MobileBorder>
          <HeaderFlex>
            <label htmlFor="search">
              <SearchSvgF />
            </label>
            <input
              value={searchValue}
              onChange={cityFilter}
              type="text"
              id="search"
              placeholder={t('Search')}
            />
          </HeaderFlex>
          <Close
            show={searchValue.length}
            onClick={() => {
              setSearchValue("")
            }}
          >
            <CloseSvg />
          </Close>
        </MobileBorder>
      </SearchHeader>
      <SearchListWrapper>
        {searchData ? (
          searchData.map((item, index) => {
            return <SearchListItem key={index} data={item} />
          })
        ) : (
          <Error>{t("Error")}</Error>
        )}
      </SearchListWrapper>
    </SearchBoxS>
  )
}
