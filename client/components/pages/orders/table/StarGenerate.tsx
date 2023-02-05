import { StarSvg } from "../../../all-svg"

export const StarGenerate = (data, isMobile) => {
  let result: any[] = []
  for (let i = 0; i <= 5; i++) {
    if (i < data.rating) {
      result.push(<StarSvg />)
    } else if (isMobile && i < 5) {
      {
        result.push(<StarSvg opacity={"0.2"} />)
      }
    }
  }
  
  return (
    <>
      {result.map((item) => {
        return item
      })}
    </>
  )
}
