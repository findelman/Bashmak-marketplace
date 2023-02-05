import { convertToObject } from "typescript"
import $api from "./api-manipulation"

export const getCityList = async () => {
  try {
    const response = await $api.get("city/list")
    return response
  } catch {}
}

export const _getCityList = (setData) => {
  getCityList().then((resp: any) => {
    console.log(resp)
    if (resp?.status === 201) {
      console.log("okay")
    }
    console.log(resp.data.result)
  
    setData(resp.data.result)
  })
}
