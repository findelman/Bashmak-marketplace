import { useEffect, useState } from "react"

export function useTabChange(_activeTab, data1, data2, headerTab?, data?, tableWrapper?) {
  const [activeTab, SetActiveTab] = useState<string>(_activeTab)
  let checkActiveTab: boolean = activeTab === `${_activeTab}`

  const [changeItemsData, SetItemsData] = useState(data1)

  useEffect(() => {
    checkActiveTab ? SetItemsData(data1) : SetItemsData(data2)
    if (tableWrapper) tableWrapper.current.scrollTop = 0
  }, [activeTab, headerTab, data])

  return [activeTab, changeItemsData, SetActiveTab, checkActiveTab, SetItemsData]
}
