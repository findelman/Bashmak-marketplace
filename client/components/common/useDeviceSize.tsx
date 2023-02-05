import { useState, useEffect } from "react";

// Так как страницы генерируются на стороне сервера дефолтным путем мы не можем получить ширину и высоту фрейма юзера

const useDeviceSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width, height];
};

export default useDeviceSize;
