"use client";
import { useParamsStore } from "@/hooks/use-params-store";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";

const Logo = () => {
  const router = useRouter();
  const pathName = usePathname();
  const reset = useParamsStore((state) => state.reset);

  function handleReset() {
    if (pathName !== "/") router.push("/");
    reset();
  }
  return (
    <div
      className="flex cursor-pointer items-center gap-2 text-3xl font-semibold"
      onClick={handleReset}
    >
      <AiOutlineCar size={34} />
      <div>Autrade</div>
    </div>
  );
};

export default Logo;
