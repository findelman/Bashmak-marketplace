import { useDispatch, useSelector } from "react-redux"
import { showBag } from "../slices/bagPopUp"

export const useBag = () => {
  const dispatch = useDispatch()
  const { show, id, section } = useSelector((state: any) => state.bag)

  const _showBag = (id?: any, section?: any) => {
    dispatch(showBag({ id: id, section: section }))
  }

  return {
    show,
    id,
    section,
    _showBag
  }
}

