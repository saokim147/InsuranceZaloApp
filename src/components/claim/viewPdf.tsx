import { Box, Header, Page, useLocation, useNavigate } from "zmp-ui";
import MyPdfDocumentView from "../pdfViewer";
import { useQuery } from "@tanstack/react-query";
import { printPdf } from "@/api/claimApi";
import QueryStatus from "../ui/queryStatus";
import { Button } from "../ui/button";

export default function ViewPdfPage() {
  const location = useLocation();
  const navigation = useNavigate();
  const claimInitId = location.state?.claimInitId;
  const { data: pdfResponse, status } = useQuery({
    queryKey: ["pdf"],
    queryFn: async () => await printPdf(claimInitId),
  });

  return (
    <Page className="bg-background flex flex-col">
      <Header
        title="Gửi mã OTP"
        backgroundColor="#e42154"
        textColor="white"
        style={{ position: "sticky" }}
      />
      <Box
        mt={2}
        p={6}
        flex
        flexDirection="column"
        className="bg-background flex-1 overflow-auto rounded-lg outline-1 outline-neutral-200 outline-double"
      >
        {status !== "success" && <QueryStatus status={status} />}
        {status === "success" && (
          <>
            <div className="text-base font-semibold mb-2">
              Kiểm tra thông tin trong Đơn YCBT trước khi nhấn xác thực OTP
            </div>
            <div className="flex flex-row mt-2">
              <Button
                className="flex-1"
                onClick={() =>
                  navigation("/methodOtp", {
                    state: { claimInitId: claimInitId },
                  })
                }
              >
                Xác thực OTP
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => navigation("/")}
              >
                Hủy
              </Button>
            </div>
            {pdfResponse && (
              <MyPdfDocumentView base64String={pdfResponse?.model.data || ""} />
            )}
          </>
        )}
      </Box>
    </Page>
  );
}
