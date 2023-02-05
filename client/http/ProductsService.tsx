import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { setProductData } from "../store/slices/productSlice"
import $api from "./api-manipulation"

const endpoints = [
  `product/company/list?type_id=1&in_sale=true`,
  `product/company/list?type_id=1&in_sale=false`,
  `product/company/list?type_id=2&in_sale=true`,
  `product/company/list?type_id=2&in_sale=false`,
]

export const getProduct = () => {
  const dispatch = useDispatch()
  const getData = () => {
    axios
      .all(
        endpoints.map((endpoints) => {
          return $api.get(endpoints).then((resp) => {
            return resp
          })
        })
      )
      .then((resp: any) => {
        dispatch(
          setProductData(
            (resp = [
              resp[0].data.results,
              resp[1].data.results,
              resp[2].data.results,
              resp[3].data.results,
            ])
          )
        )
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return { getData }
}
