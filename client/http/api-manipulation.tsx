import axios from "axios"

export const API_URL = "https://bashmak-server.vercel.app/"

const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  if (localStorage.getItem("type_id") === "3") config.params = { ...config.params, company_id: localStorage.getItem('company_id') || 1}
  return config
})

export const dataHand = async (data, url) => {
  try {
    const response = await $api.post(url, data)
    return response
  } catch (err: any) {
    console.log(err)
  }
}

//

// Есть запросы которые супер-юзер должен отправлять без company_id этот конфиг как раз для таких кейсов
const $apiNC = axios.create({
  baseURL: API_URL,
})

$apiNC.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

  return config
})

export { $apiNC, $api as default }
