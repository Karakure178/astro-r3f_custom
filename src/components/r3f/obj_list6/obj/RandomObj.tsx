import Box from "./Box";
import Box2 from "./Box2";

import { forwardRef } from "react";

// 条件分岐するオブジェクト関数
const RandomObj = forwardRef(({ jotai = 1, size = 1, ...props }, ref) => {
  return (
    <>
      {jotai === 1 ? (
        <Box size={size} {...props} ref={ref} />
      ) : (
        <Box2 size={size} {...props} ref={ref} />
      )}
    </>
  );
});
export default RandomObj;
