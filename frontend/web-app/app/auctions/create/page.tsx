import Heading from "@/app/components/heading";
import React from "react";
import AuctionForm from "../auction-form";

const Create = () => {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg bg-white rounded-lg">
      <Heading
        title="Sell you car!"
        subtitle="Please enter the details of your car!"
      ></Heading>
      <AuctionForm />
    </div>
  );
};

export default Create;
