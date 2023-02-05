import { useSelector } from "react-redux"

export const useDevice = () => {
  const { width, height, isMobile } = useSelector((state: any) => state.device)

  return {
    width,
    height,
    isMobile,
  }
}
