import { getDetailsViewData } from "@/app/actions/auction-actions";
import Heading from "@/app/components/heading";
import React from "react";
import AuctionForm from "../../auction-form";

export default async function Update({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDetailsViewData(id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your car"
      />
      <AuctionForm auction={data} />
    </div>
  );
}
