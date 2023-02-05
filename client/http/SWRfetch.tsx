import $api from "./api-manipulation"

export const SWRfetch = (_method) => {
  return (url) => {
    return $api[_method](url).then((res) => res.data)
  }
}
