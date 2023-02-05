import $api from "../../../http/api-manipulation"
import * as XLSX from 'xlsx'

export function downloadFile(fileName,url) {
  $api.get(url, { responseType: "arraybuffer" }).then((res) => {
    const data = new Uint8Array(res.data)
    const sheet = XLSX.read(data, { type: "array" })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, sheet.Sheets.Sheet1, "Sheet1")
    XLSX.writeFile(workbook, fileName)
  })
}
