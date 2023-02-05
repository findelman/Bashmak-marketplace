import { useSelector } from "react-redux"

export const useproductsPopUp = () => {
  const { editingTitle, id } = useSelector((state: any) => state.ProductPopUp)

  return {
    editingTitle,
    id,
  }
}
