import { useEffect } from "react";

const useTitle = pageName => {
  useEffect(() => {
    document.title = `Chapel | ${pageName}`;
  }, [pageName]);
};

export default useTitle;
