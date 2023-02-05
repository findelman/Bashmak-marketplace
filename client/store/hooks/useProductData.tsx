import { useSelector } from "react-redux"

export const useProductData = () => {
  const data = useSelector((state: any) => state.productReducer.data)
  return data
}
