import React from "react";
import CountdownTimer from "./countdown-timer";
import CarImage from "./car-image";
import { Auction } from "@/types";
interface Props {
  auction: Auction;
}
export const AuctionCard = ({ auction }: Props) => {
  return (
    <a href="#">
      <div className="relative w-full bg-[#F4F4F0] aspect-video rounded-lg overflow-hidden">
        <CarImage imageUrl={auction.imageUrl} />
        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </a>
  );
};
