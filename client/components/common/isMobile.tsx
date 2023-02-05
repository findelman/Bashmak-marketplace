import { useDispatch } from "react-redux";
import useDeviceSize from "./useDeviceSize";
import { setDevice } from "../../store/slices/device";

export default function IsMobile({ children }) {
  const dispatch = useDispatch();

  const [width, height] = useDeviceSize();
  const isMobile = width < 890;

  dispatch(
    setDevice({
      width: width,
      isMobile: isMobile,
    })
  );
  return <>{children}</>;
}
