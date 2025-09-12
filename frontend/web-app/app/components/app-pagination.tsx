"use client";
import { Pagination } from "flowbite-react";
import React from "react";
interface Props {
  currentPage: number;
  pageCount: number;
  pageChanged: (page: number) => void;
}
const AppPagination = ({ currentPage, pageCount, pageChanged }: Props) => {
  return (
    <Pagination
      currentPage={currentPage === 0 ? 1 : currentPage}
      onPageChange={(e) => {
        pageChanged(e);
      }}
      totalPages={pageCount === 0 ? 1 : pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
};

export default AppPagination;
