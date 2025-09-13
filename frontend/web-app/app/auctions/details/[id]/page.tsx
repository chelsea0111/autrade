import { getDetailsViewData } from "@/app/actions/auction-actions";
import Heading from "@/app/components/heading";
import React from "react";
import CountdownTimer from "../../countdown-timer";
import CarImage from "../../car-image";
import DetailedSpace from "./detailed-space";
import EditButton from "./edit-button";
import { getCurrentUser } from "@/app/actions/auth-actions";
import DeleteButton from "./delete-button";
import BidList from "./bid-list";

const Details = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getDetailsViewData(id);
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id} />
              <DeleteButton id={data.id} />
            </>
          )}
        </div>
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
          <CarImage imageUrl={data.imageUrl} />
        </div>
        <BidList user={user} auction={data} />
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpace auction={data} />
      </div>
    </>
  );
};

export default Details;
