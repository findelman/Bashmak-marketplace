export const getLocalStorageValue = (key, defaultValue = "") => {
  if (typeof window !== "undefined" && localStorage.getItem(key)) {
    return localStorage.getItem(key)
  }
  return defaultValue
}
