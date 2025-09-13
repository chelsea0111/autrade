"use client";
import React, { useEffect, useState } from "react";
import { AuctionCard } from "./auction-card";
import AppPagination from "../components/app-pagination";
import { getData } from "../actions/auction-actions";
import Filters from "./filters";
import { useParamsStore } from "@/hooks/use-params-store";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "../components/empty-filter";
import { useAuctionStore } from "@/hooks/use-auction-store";

const AuctionList = () => {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }))
  );
  const data = useAuctionStore(
    useShallow((state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );
  const setData = useAuctionStore((state) => state.setData);

  const setParams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl(
    { url: "", query: params },
    { skipEmptyString: true }
  );

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [url, setData]);

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data &&
              data.auctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
};

export default AuctionList;
