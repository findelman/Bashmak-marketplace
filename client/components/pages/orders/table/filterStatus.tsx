// Фильтруем данные при нажатии кнопок => Все статусы
export const filterStatus = (ordersApi, SetTableData) => {
  return (e) => {
    const targetData = e.target.dataset.status;
    let filterData = ordersApi.filter((item) => {
      return item.status === targetData;
    });
    // Все статусы имеет пустой атрибут, если атрибута нету мы не фильтруем данные
    targetData === "" ? SetTableData(ordersApi) : SetTableData(filterData);
  };
};
