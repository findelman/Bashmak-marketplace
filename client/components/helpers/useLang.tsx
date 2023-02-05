import { useEffect, useState } from "react"

export const useLang = () => {
  const [lang, setLang] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLang(localStorage.getItem("lang"))
    }
  }, [lang])
  return lang
}
