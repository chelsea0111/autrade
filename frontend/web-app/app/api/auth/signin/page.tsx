import EmptyFilter from "@/app/components/empty-filter";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await searchParams;
  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="Please click below to sign in"
      showLogin
      callbackUrl={callbackUrl}
    />
  );
}
