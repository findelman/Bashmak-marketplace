// Фиксим 100vh на мобилках, из за браузерной наивгации урезает контент
export const useVh = () => {
  if (typeof window !== "undefined") {
    document.documentElement.style.setProperty("--default-transition", `0ms`)
    document.documentElement.style.setProperty("--fast-transition", `0ms`)
    setTimeout(() => {
      document.documentElement.style.setProperty("--default-transition", `300ms`)
      document.documentElement.style.setProperty("--fast-transition", `200ms`)
    }, 300)
  }
}
