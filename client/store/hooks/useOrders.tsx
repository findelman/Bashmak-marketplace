import { useSelector } from "react-redux"

export const useOrders = () => {
  const { openChat,chatId } = useSelector((state: any) => state.ordersSlice)

  return {
    openChat,
    chatId
  }
}
