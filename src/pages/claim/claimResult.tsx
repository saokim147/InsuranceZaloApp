import { Box, DatePicker, useNavigate } from "zmp-ui";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPagedClaimList } from "@/api/claimApi";
import { useState } from "react";

import ClaimList from "@/components/claim/claimList";
import {
  CORE_SUBMITTED_STATUS,
  CREATED_STATUS,
  DELETED_STATUS,
  DOCUMENT_ADDED_STATUS,
  PAGE_SIZE,
  PENDING_DOCUMENT_STATUS,
  PROCESSING_STATUS,
  RECEIVED_STATUS,
  REJECTED_STATUS,
  SUBMITTED_STATUS,
} from "@/utils/constant";
import { formatDateToString } from "@/utils/date";
import useIntersectionObserver from "@/hooks/useInterceptionObserver";
import QueryStatus from "@/components/ui/queryStatus";
import Autocomplete from "@/components/ui/autocomplete";
import { normalizeVietnamese } from "@/utils/common";
import { ClaimFilter, ComboboxValue } from "@/types/uiType";
import { nativeStorage } from "zmp-sdk/apis";
import { AppProfile } from "@/types/userType";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/utils/money";
import FloatingActionButton from "@/components/ui/floating-action-button";

const statuses: ComboboxValue[] = [
  { id: "1", name: "Đã nhận", value: RECEIVED_STATUS },
  { id: "2", name: "Đã hủy", value: DELETED_STATUS },
  { id: "3", name: "Đang xử lí", value: PROCESSING_STATUS },
  { id: "4", name: "Hủy", value: DELETED_STATUS },
  { id: "5", name: "Đã bổ sung chứng từ", value: DOCUMENT_ADDED_STATUS },
  { id: "6", name: "Chờ bổ sung chứng từ", value: PENDING_DOCUMENT_STATUS },
  { id: "7", name: "Đã tạo", value: CREATED_STATUS },
  { id: "8", name: "Đã nộp", value: SUBMITTED_STATUS },
  { id: "9", name: "Từ chối", value: REJECTED_STATUS },
  {
    id: "10",
    name: "Ghi nhận vào hệ thống core",
    value: CORE_SUBMITTED_STATUS,
  },
  {
    id: "11",
    name: "Đang Ghi nhận vào hệ thống core",
    value: CORE_SUBMITTED_STATUS,
  },
];

export default function ClaimResultPage() {
  const navigation = useNavigate();
  const [tempOptions, setTempOptions] = useState<ClaimFilter>({
    SendFrom: "",
    SendTo: "",
    Status: "",
  });
  const [filterOptions, setFilterOptions] = useState<ClaimFilter>({
    SendFrom: "",
    SendTo: "",
    Status: "",
  });
  const handleSearch = () => {
    setFilterOptions({
      Status: tempOptions.Status,
      SendFrom: tempOptions.SendFrom,
      SendTo: tempOptions.SendTo,
    });
  };
  const handleReset = () => {
    setFilterOptions({
      Status: "",
      SendFrom: "",
      SendTo: "",
    });
    setTempOptions({
      Status: "",
      SendFrom: "",
      SendTo: "",
    });
  };
  // if (!nativeStorage.getItem("profile")) {
  //   navigation("/");
  // }
  // const userProfile = JSON.parse(
  //   nativeStorage.getItem("profile")
  // ) as AppProfile;
  // const userId = userProfile.userId;
  const userId = "59d337c9-386a-46c4-8813-8ac10127b7ba";
  const [query, setQuery] = useState("");
  const {
    data: claimList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["claimList", filterOptions],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPagedClaimList({
        Limit: PAGE_SIZE,
        Page: pageParam,
        Order: "SentAt Desc",
        UserGroups: ["ONLINE"],
        UserFilter: [userId],
        MemName: null,
        SendFrom: filterOptions.SendFrom,
        SendTo: filterOptions.SendTo,
        UserId: userId,
        StatusClaimDeclare: filterOptions.Status || "",
      });

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (allPage.length < lastPage.count) {
        return allPage.length + 1;
      }
      return undefined;
    },
  });

  const lastPostRef = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  const filteredStatuses =
    query === ""
      ? statuses
      : statuses.filter((status) => {
          return normalizeVietnamese(status.name).includes(
            normalizeVietnamese(query)
          );
        });
  if (!claimList) return <QueryStatus status={status} />;
  return (
    <>
      <Box mt={2} p={2} mx={2}>
        <div className="flex flex-col gap-1">
          <Box mt={1}>
            <div className="text-foreground">Trạng thái hồ sơ</div>
            <Autocomplete
              className="mt-2 h-[48px]"
              items={filteredStatuses}
              placeholder="Chọn trạng thái"
              selectedItem={tempOptions.Status || ""}
              keyValue="value"
              displayValue="name"
              setSelectedItem={(value) =>
                setTempOptions({ ...tempOptions, Status: value })
              }
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
          <Box mt={1}>
            <div className="text-foreground">Ngày gửi từ</div>
            <DatePicker
              maskClosable
              dateFormat="dd/mm/yyyy"
              value={
                tempOptions.SendFrom
                  ? new Date(tempOptions.SendFrom)
                  : undefined
              }
              onChange={(value) =>
                setTempOptions({
                  ...filterOptions,
                  SendFrom: formatDateToString(value),
                })
              }
            />
          </Box>
          <Box mt={1}>
            <div className="text-foreground">Ngày gửi đến</div>
            <DatePicker
              mask
              maskClosable
              dateFormat="dd/mm/yyyy"
              value={
                tempOptions.SendTo ? new Date(tempOptions.SendTo) : undefined
              }
              onChange={(value) =>
                setTempOptions({
                  ...filterOptions,
                  SendTo: formatDateToString(value),
                })
              }
            />
          </Box>
        </div>
      </Box>
      <Box mt={2} mx={4} flex flexDirection="row" className="gap-3">
        <Button className="flex-1" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button variant="secondary" className="flex-1" onClick={handleReset}>
          Xóa lọc
        </Button>
      </Box>
      <FloatingActionButton
        onClick={() =>
          navigation("/createClaim", {
            state: { isUpdate: false },
          })
        }
      />
      <Box mt={2} p={2} mx={2}>
        {status === "success" &&
          (claimList.pages[0].count === 0 ? (
            <div className="p-4 text-center font-medium">Không có kết quả</div>
          ) : (
            <>
              <Box mb={2} className="font-semibold text-gray-400">
                <div>{claimList.pages[0].count} Hồ sơ</div>
              </Box>
              <Box mb={2} className="gap-2" flex flexDirection="column">
                <div className="font-semibold">
                  Tổng số tiền yêu cầu:{" "}
                  {formatMoney(claimList.pages[0].result.totalRequestAmount)}
                </div>
                <div className="font-semibold">
                  Tổng số tiền bồi thường:{" "}
                  {formatMoney(claimList.pages[0].result.totalClaimAmount) || 0}
                </div>
              </Box>
              {claimList.pages.map((page, index) => (
                <div
                  key={index}
                  ref={
                    index === claimList.pages.length - 1 ? lastPostRef : null
                  }
                >
                  <ClaimList list={page.model} />
                </div>
              ))}
              {isFetchingNextPage && (
                <div className="p-4 text-center">Load thêm dữ liệu...</div>
              )}
              {!hasNextPage && !isFetchingNextPage && (
                <div className="p-4 text-center font-medium">Hết</div>
              )}
            </>
          ))}
      </Box>
    </>
  );
}
