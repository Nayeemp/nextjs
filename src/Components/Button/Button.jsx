"use client";

import { incrementByOne } from "@/Redux/features/Button/ButtonSlice";
import { useDispatch, useSelector } from "react-redux";

function Button() {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.Button);
  //   console.log("value = ", value);

  return (
    <div className="m-5 flex flex-col justify-center items-center h-full w-full">
      <div className="mb-4 text-xl text-bold">{value}</div>
      <button
        type="button"
        className="px-[22px] md:px-[30px] lg:px-[35px] xl:px-[37px] py-[3px] sm:py-[4px] md:py-[7px] lg:py-[9px] xl:py-[12px]  bg-gradient-to-b from-[#D13F96] to-[#833586]  text-white rounded-[5px] text-xs md:text-sm lg:text-base xl:text-lg font-bold leading-[21.48px]"
        onClick={() => {
          dispatch(incrementByOne());
          //   console.log("click");
        }}
      >
        increment by 1
      </button>
    </div>
  );
}

export default Button;
