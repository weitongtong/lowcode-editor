import { forwardRef } from "react";
import { CommonComponentProps } from "../../interface";


const Page = forwardRef<{}, CommonComponentProps>(({ children, styles }, ref) => {
  return (
    <div
      className="p-[20px]"
      style={{ ...styles }}
    >
      {children}
    </div>
  );
})

export default Page;
