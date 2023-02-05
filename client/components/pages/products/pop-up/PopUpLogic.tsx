import { useDispatch } from "react-redux"
import { showBag } from "../../../../store/slices/bagPopUp"

export function TogglePopUpF(PopUpsContent, SetPopUpContent) {  const dispatch = useDispatch()
  return (e) => {
    // closet чтоб не проваливаться вниз, считваем атрибрут только с button
    const targetDataContent = e.target.closest("button").dataset.popupContent

    // Ищем в массиве нужный нам контент
    let SearchPopUpContent = PopUpsContent.find(
      (content) => content.type.name === targetDataContent
    )

    SetPopUpContent(SearchPopUpContent)
    dispatch(showBag({}))
    document.body.style.overflow = "hidden"
  }
}
