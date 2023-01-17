import { useEffect, useState } from "react";

const useOutsideClick = (ref, setDisplay) => {
  useEffect(() => {
    function handleClickOut(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    }
    document.addEventListener("mousedown", handleClickOut);
    return () => {
      document.removeEventListener("mousedown", handleClickOut);
    };
  }, [ref]);
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({});

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export { useOutsideClick, useWindowSize };
