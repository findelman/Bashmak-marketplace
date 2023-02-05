import { renderHook } from "@testing-library/react-hooks"
import { useState, useEffect } from "react"
import { SumFormat } from "../../../../styles/style-variables"

export function CalculateSum(array: any) {
  let [sum, SetSum] = useState(0)
  useEffect(() => {
    if (typeof array !== "undefined" && array.results !== 0) {
      const result = array
        .reduce((acc, el) => (acc += +el.price), 0)
        .toString()
        .replace(SumFormat, "$1 ")

      SetSum(result)
    } else {
      SetSum(0)
    }
  }, [array])
  return sum
}

export const CalculateTotalSum = (array: any) => {
  const [sum, SetSum] = useState(0)
  useEffect(() => {
    if (typeof array !== "undefined" && array.results.length !== 0) {
      const result = array.results
        .map((item) => {
          return item.products.reduce((acc, next) => {
            return acc + next.price
          }, 0)
        })
        .reduce((acc, next) => {
          return (acc += next)
        })

      SetSum(result)
    } else {
      SetSum(0)
    }
  }, [array])
  return sum
}

