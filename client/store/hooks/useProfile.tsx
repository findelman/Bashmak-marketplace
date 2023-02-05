import { useSelector } from "react-redux"

export const useProfile = () => {
  const { token, email, phone, isLoggedIn, type_id } = useSelector((state: any) => state.user)

  return {
    isLoggedIn,
    email,
    phone,
    token,
    type_id,
  }
}
