import React from "react";
import CountdownTimer from "./countdown-timer";
import CarImage from "./car-image";
import { Auction } from "@/types";
import Link from "next/link";
import CurrentBid from "./current-bid";
interface Props {
  auction: Auction;
}
export const AuctionCard = ({ auction }: Props) => {
  return (
    <Link href={`/auctions/details/${auction.id}`}>
      <div className="relative w-full bg-[#F4F4F0] aspect-video rounded-lg overflow-hidden">
        <CarImage imageUrl={auction.imageUrl} />
        <div className="absolute bottom-2 left-2">
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
        <div className="absolute top-2 right-2">
          <CurrentBid
            reservePrice={auction.reservePrice}
            amout={auction.currentHighBid}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </Link>
  );
};
