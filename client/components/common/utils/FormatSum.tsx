import { SumFormat } from "../../../styles/style-variables"

export const FormatSum = (sum) => {
  if (sum) return sum.toString().replace(SumFormat, "$1 ")
}
