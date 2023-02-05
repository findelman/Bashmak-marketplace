import axios from "axios"
import { useDevice } from "../store/hooks/useDevice"
import $api from "./api-manipulation"

// api/v1.0/order/company/list/?page=3&per_page=5&status_id=2

export const getOrderList = (data, checkDevice) => {
  const endpoints = [
    `order/company/list?status_id=1&page=1&per_page=${checkDevice}&sort[create_datetime]=DESC`, `order/company/list?status_id=2&page=1&per_page=${checkDevice}&sort[create_datetime]=DESC`,
  ]
  
  axios
    .all(
      endpoints.map((endpoints) => {
        return $api.get(endpoints).then((resp) => {
          return resp
        })
      })
    )
    .then((resp: any) => {
      data((resp = [resp[0].data, resp[1].data]))
    })
}
