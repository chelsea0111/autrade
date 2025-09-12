"use client";
import { useParamsStore } from "@/hooks/use-params-store";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";

const Logo = () => {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div
      className="flex cursor-pointer items-center gap-2 text-3xl font-semibold"
      onClick={reset}
    >
      <AiOutlineCar size={34} />
      <div>Autrade</div>
    </div>
  );
};

export default Logo;
