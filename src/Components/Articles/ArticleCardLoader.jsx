import React from "react";
import "./ArticleCard.css";

function ArticleCardLoader() {
  return (
    <div className="border-2 border-transparent hover:border-primary hover:rounded-[15px] animate-pulse">
      <div className="bg-[#FFFFFF] rounded-xl ArticlesCardShadow ArticlesCardHeight flex overflow-hidden">
        <div className="flex justify-center items-center h-full w-auto aspect-[412/382]">
          <div className="bg-gray-300 h-full w-full rounded-xl" />
        </div>

        <div className="p-2 sm:p-4 lg:p-5 flex flex-col justify-between h-full w-full">
          <div className="flex flex-row justify-between items-center mb-[2px] sm:mb-[7px]">
            <div className="p-[3px] sm:p-[5px] bg-gray-300 w-1/3 h-[16px] sm:h-[20px] rounded" />
            <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] bg-gray-300 rounded-full" />
          </div>

          <div className="bg-gray-300 w-full h-[20px] sm:h-[24px] mb-[2px] sm:mb-[7px] rounded" />

          <div className="flex justify-between items-end">
            <div className="flex">
              <div className="w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] bg-gray-300 rounded-full" />
              <div className="ml-2.5">
                <div className="bg-gray-300 w-[80px] sm:w-[96px] h-[14px] sm:h-[18px] rounded" />
                <div className="flex items-center">
                  <div className="w-[10px] h-[10px] sm:w-[13px] sm:h-[13px] bg-gray-300 rounded-full" />
                  <div className="ml-1 bg-gray-300 w-[20px] sm:w-[28px] h-[12px] sm:h-[16px] rounded" />
                </div>
              </div>
            </div>
            <div className="bg-gray-300 w-[45px] xl:w-[60px] h-[14px] leading-[14px] xl:text-xs font-light text-[#757575] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCardLoader;
