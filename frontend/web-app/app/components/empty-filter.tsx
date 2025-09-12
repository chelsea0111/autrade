"use client";

import { useParamsStore } from "@/hooks/use-params-store";
import Heading from "./heading";
import { Button } from "flowbite-react";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
};

export default function EmptyFilter({
  title = "No matches for this filter",
  subtitle = "Try changing or resetting the filter",
  showReset,
}: Props) {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button outline onClick={reset}>
            Remove Filters
          </Button>
        )}
      </div>
    </div>
  );
}
