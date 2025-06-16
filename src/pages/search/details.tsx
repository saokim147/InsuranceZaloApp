import { hospital } from "@/types/hospitalType";
import { isNullOrEmpty } from "@/utils/common";
import { Box, Header, Page, useLocation, Text } from "zmp-ui";

function DetailPage() {
  const location = useLocation();
  if (!location.state) {
    return <div className="text-center">No data available</div>;
  }
  const hospitalData = location.state.hospital as hospital;

  return (
    <Page className="bg-white">
      <Header
        title="Thông tin chi tiết"
        textColor="white"
        backgroundColor="#e92020"
        style={{ position: "sticky" }}
      />
      <Box mt={4} p={1} mx={2}>
        <Box mx={6}>
          <Text.Title>{hospitalData.hospitalName}</Text.Title>
        </Box>
        <Box mx={6} mt={2}>
          <Box mt={2}>
            <span className="font-medium">Địa chỉ : </span>
            {hospitalData.hospitalAddress}
          </Box>

          <Box mt={2}>
            {!isNullOrEmpty(hospitalData.phoneNumber) ? (
              <>
                <span className="font-medium">Số điện thoại : </span>
                {hospitalData.phoneNumber}
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box mt={2}>
            {!isNullOrEmpty(hospitalData.billingTime) ? (
              <>
                <span className="font-medium">Thời gian hoạt động : </span>
                {hospitalData.billingTime}
              </>
            ) : (
              <></>
            )}
          </Box>
          <Box mt={2}>
            <span className="font-medium">Nội Khoa : </span>
            {hospitalData.inPatient ? "Có " : "Không "}
          </Box>
          <Box mt={2}>
            <span className="font-medium">Ngoại Khoa : </span>
            {hospitalData.outPatient ? "Có " : "Không "}
          </Box>
          <Box mt={2}>
            <span className="font-medium">Nha Khoa : </span>
            {hospitalData.dental ? "Có " : "Không "}
          </Box>
          <Box mt={2}>
            {!isNullOrEmpty(hospitalData.note) ? (
              <>
                <span className="font-medium">Ghi chú : </span>
                {hospitalData.note}
              </>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Page>
  );
}

export default DetailPage;
