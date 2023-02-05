import { configureStore } from "@reduxjs/toolkit"
import bagPopUp from "./slices/bagPopUp"
import device from "./slices/device"
import user from "./slices/user"
import ProductPopUp from "./slices/productsPopUp"
import { productReducer } from "./slices/productSlice"
import ordersSlice from "./slices/orders"
// config the store
const store = configureStore({
  reducer: {
    device: device,
    user: user,
    bag: bagPopUp,
    ProductPopUp: ProductPopUp,
    productReducer,
    ordersSlice: ordersSlice,
  },
})

// export default the store
export default store

// export the action
