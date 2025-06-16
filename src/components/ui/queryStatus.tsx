import React from "react";
import { Spinner } from "./spinner";

export default function QueryStatus({ status }: { status: string }) {
  return (
    <>
      {status === "error" && (
        <div className="text-center text-red-500">
          An error occurred while fetching data.
        </div>
      )}
      {status === "pending" && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
          <Spinner size="large" />
        </div>
      )}
    </>
  );
}
