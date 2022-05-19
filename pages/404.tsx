import { useRouter } from "next/router";
import { useEffect } from "react";

const Custom404 = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const index =
      process.env.NODE_ENV === "production" ? "/mappaturaInfratel/" : "/";
    replace(index);
  }, [replace]);

  return <></>;
};

export default Custom404;
