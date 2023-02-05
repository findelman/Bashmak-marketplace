import { setProfileData } from "../store/slices/user"
import $api, { dataHand } from "./api-manipulation"

const endpoints = {
  adminLogin: "auth/admin/login",
  resetPass: "auth/password/restore/code",
}

export const _LogIn = (loginData, router, dispatch, setError,errorMess) => {
  dataHand(loginData, endpoints.adminLogin).then((resp: any) => {
    if (resp?.status === 201) {
      dispatch(
        setProfileData({
          isLoggedIn: true,
          email: loginData.login,
          token: resp.data.tokens.accessToken,
          type_id: resp.data.data.type_id,
        })
      )
      setError('')
      if (resp.data.data.type_id === 3) {
        router.push("/store-selection")
      } else {
        router.push("crm/orders")
      }

      localStorage.setItem("token", resp.data.tokens.accessToken)
      localStorage.setItem("type_id", resp.data.data.type_id)
    }
    else {
      setError(errorMess)
    }
  })
}

export const _ResetPass = (loginData) => {
  return dataHand(loginData, endpoints.resetPass)
}
