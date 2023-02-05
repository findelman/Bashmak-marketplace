import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import styled from "styled-components"
import $api from "../../../../http/api-manipulation"
import { useDevice } from "../../../../store/hooks/useDevice"
import { CustomScrollText, FlexOnlyCenter, media } from "../../../../styles/style-variables"
import { TrashSvg } from "../../../all-svg"
import { AddBtnUI } from "../../../UI-kit/buttonsU"
import { TrashBtn } from "../../orders/table/table-item"
import { AddPhotoSlider } from "./Slider"

const AddPhotoS = styled(FlexOnlyCenter)<{ height?: boolean }>`
  background: #f0f0f0;
  height: 100%;
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  ${media.mobile} {
    height: ${({ height }) => (height ? "auto" : "240px")};
    background: ${({ height }) => (height ? "transparent" : "#f0f0f0")};
    margin-bottom: 32px;
    align-items: unset;
  }
`

const UseAddBtn = styled.label<{ addPhotoFirst?: any; addPhotoMuch?: any }>`
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  cursor: pointer;
  transition: 900ms;
  position: absolute;
  margin: auto;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0px;
  ${media.notMobile} {
    :hover button {
      background: #b9382f;
    }
  }
  button {
    pointer-events: none;
  }
  z-index: 10;
  transition: 500ms;
  ${media.notMobile} {
    ${({ addPhotoFirst }) =>
      addPhotoFirst && `position: absolute; left:-41%; bottom: 6%; top: 87%;`};
    ${({ addPhotoMuch }) =>
      addPhotoMuch &&
      `
    position: absolute; left:-41%; bottom: 6%; top: 37vh;
    `}
  }

  ${media.mobile} {
    ${({ addPhotoMuch }) =>
      addPhotoMuch &&
      `
    position: absolute; left: 20px;
    bottom: 24px;
    top: 31%;
    right: unset;
    `}

    ${({ addPhotoFirst }) =>
      addPhotoFirst && `position: absolute; left:20px; bottom: 24px; top: 87%; right: unset;`};
  }
`

export const InputUpload = styled.input`
  display: none;
`

const PhotoFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  gap: 8px;
  padding: 16px 24px;
  background: #f0f0f0;
  width: 100%;
  overflow-x: scroll;
  z-index: 10;
  ${CustomScrollText}
  ::-webkit-scrollbar-track {
    margin-top: 32px;
    margin-bottom: 10px;
  }

  ${media.mobile} {
    position: inherit;
    padding: 14px 0px 11px;
    background: transparent;
    width: calc(100vw - 32px);
  }
`

const PhotoFooterItem = styled.div<{ isActive?: boolean }>`
  min-width: 96px;
  max-width: 96px;
  height: 96px;
  position: relative;
  cursor: pointer;
  ${TrashBtn} {
    top: -2px;
    z-index: 100;
    right: -2px;
    border: 1px solid #ff1e1e;
    background: white;
    :hover {
      background: var(--default-red);
    }
    ${media.mobile} {
      width: 28px;
      height: 28px;
    }
  }
  img {
    transition: var(--default-transition) linear;
    border-radius: var(--default-border-radius);
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: ${({ isActive }) => (isActive ? "0.5" : "1")};
  }
  ${media.mobile} {
    width: 74px;
    min-width: 74px;
    height: 74px;
  }
`

export const AddPhoto = ({ data, setDataGallery, inputValue }) => {
  const t = useTranslations("ProductPopUp")
  const [imageURL, setImageURL] = useState<any>([])

  useEffect(() => {
    if (data) {
      setImageURL(data)
    } else {
      setImageURL([])
    }
  }, [data])

  async function uploadFile(formData) {
    try {
      const response = await $api.post("file/upload", formData)
      console.log(response.data)
      setImageURL([...imageURL, { url: response.data.file.url }])
      setDataGallery({
        ...inputValue,
        gallery: [...inputValue.gallery, response.data.file.url],
      })
    } catch (error) {
      console.error(error)
    }
  }
  const handleOnChange = (event) => {
    event.preventDefault()

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    uploadFile(formData)
  }

  const [my_swiper, set_my_swiper] = useState<any>({})

  const [activeIndex, setActiveIndex] = useState(my_swiper.activeIndex)

  return (
    <>
      <AddPhotoS height={imageURL.length}>
        <UseAddBtn
          addPhotoMuch={imageURL.length > 1}
          addPhotoFirst={imageURL.length === 1}
          htmlFor="file-loader-button"
        >
          <AddBtnUI as="input" text={t("AddPhoto")} />
        </UseAddBtn>
        <InputUpload id="file-loader-button" type="file" onChange={handleOnChange} />
        {imageURL.length !== 0 && (
          <AddPhotoSlider
            setActiveIndex={setActiveIndex}
            height={imageURL.length > 1 ? false : true}
            ev={my_swiper}
            set_my_swiper={set_my_swiper}
            data={imageURL}
          />
        )}

        {imageURL.length > 1 && (
          <>
            <PhotoFooter>
              {imageURL.map((item, index) => {
                return (
                  <PhotoFooterItem key={index} isActive={activeIndex === index}>
                    <TrashBtn
                      onClick={() => {
                        const updatedImageURL = [...imageURL]
                        updatedImageURL.splice(index, 1)
                        setImageURL(updatedImageURL)
                        setDataGallery({
                          ...inputValue,
                          gallery: updatedImageURL.map((item) => item.url),
                        })
                      }}
                    >
                      <TrashSvg />
                    </TrashBtn>
                    <img
                      src={item.url}
                      alt=""
                      onClick={() => {
                        console.log(my_swiper.activeIndex)
                        setActiveIndex(index)
                        my_swiper.slideTo(index)
                      }}
                    />
                  </PhotoFooterItem>
                )
              })}
            </PhotoFooter>
          </>
        )}
      </AddPhotoS>
    </>
  )
}
