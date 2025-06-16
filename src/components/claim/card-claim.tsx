import { ClaimItem } from "@/types/claimType";
import { getFormatDate } from "@/utils/common";
import { Box, Modal, useNavigate } from "zmp-ui";
import { ChevronRight, XIcon } from "lucide-react";
import BadgeStatus from "./badgeStatus";
import { Button } from "../ui/button";
import { isDeleteable } from "@/utils/status";
import { useState } from "react";
import { deleteClaim } from "@/api/claimApi";
import toast from "../ui/sonner";
import { useQueryClient } from "@tanstack/react-query";
import { formatMoney } from "@/utils/money";

export default function CardClaim({ claimItem }: { claimItem: ClaimItem }) {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const userId = "59d337c9-386a-46c4-8813-8ac10127b7ba";
  return (
    <Box
      flex
      flexDirection="row"
      p={4}
      mb={3}
      className="rounded-lg border  border-neutral-200  text-card-foreground"
    >
      <Box className="flex-1">
        <div>
          <span className="font-medium">Ngày gửi: </span>
          {getFormatDate(claimItem.sentAt)}
        </div>
        <div>
          <span className="font-medium">Số Khai báo</span>: {claimItem.ciCode}
        </div>
        {claimItem.claimAmount != null ? (
          <>
            <span className="font-medium">Số hồ sơ</span>:{claimItem.ciCodeRef}
          </>
        ) : (
          <></>
        )}
        <div>
          <span className="font-medium">Họ tên NĐBH: </span>
          {claimItem.memLastName + " " + claimItem.memFirstName}
        </div>
        <div>
          <span className="font-medium">Mã NĐBH: </span>
          {claimItem.memCode}
        </div>
        <div>
          <span className="font-medium">Số hợp đồng</span>:{claimItem.polNo}
        </div>
        <div>
          <span className="font-medium">Số tiền yêu cầu: </span>
          {formatMoney(claimItem.ciRequestAmount)}
        </div>

        {claimItem.claimAmount != null ? (
          <>
            <span className="font-medium">Số tiền bồi thường</span>:
            {formatMoney(claimItem.claimAmount)}
          </>
        ) : (
          <></>
        )}
        <Box mt={2}>
          <BadgeStatus status={claimItem.status} />
        </Box>
      </Box>
      <div className="flex">
        <Button
          size="icon"
          className=" -ml-px border rounded-r-none font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10   transition-all"
          disabled={!isDeleteable(claimItem.status)}
          onClick={() => setModalVisible(true)}
        >
          <XIcon />
        </Button>
        <Button
          size="icon"
          className=" -ml-px rounded-l-none  border font-medium bg-white text-gray-900 align-middle hover:bg-gray-50 focus:z-10   transition-all"
          onClick={async () => {
            navigation("/claimDetail", {
              state: { claimId: claimItem.claimIntiId },
              direction: "forward",
            });
          }}
        >
          <ChevronRight size={25} className="text-primary" />
        </Button>
      </div>
      <Modal
        visible={modalVisible}
        title="Hủy đơn đã lưu"
        onClose={() => setModalVisible(false)}
        verticalActions
        className="text-center"
        description="Đơn đã hủy sẽ không thể tạo lại"
      >
        <Box p={6} flex flexDirection="row" className="gap-3">
          <Button
            onClick={async () => {
              try {
                const response = await deleteClaim(
                  claimItem.claimIntiId,
                  userId
                );
                if (response.success) {
                  toast({
                    title: "Hủy đơn thành công",
                    variant: "success",
                  });
                  await queryClient.invalidateQueries({
                    queryKey: ["claimList"],
                  });
                  setModalVisible(false);
                }
              } catch (error) {
                toast({
                  title: "Lỗi hệ thống xin hãy thử lại ",
                  variant: "error",
                });
              }
            }}
            className="flex-1"
          >
            Xác nhận
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setModalVisible(false);
            }}
            className="flex-1"
          >
            Hủy
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
