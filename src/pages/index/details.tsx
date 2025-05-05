import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hospital, HospitalsResponse } from "@/types/hospital";
import { Box, Header, Page, useLocation } from "zmp-ui";

function DetailService({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex-col">
      <span className="font-medium">{title}:</span>
      <span>{value}</span>
    </div>
  );
}

function DetailPage() {
  const location = useLocation();
  if (!location.state) {
    return <div className="text-center">No data available</div>;
  }
  const hospitalData = location.state.hospital as hospital;

  return (
    <Page>
      <Header
        title="Bệnh viện"
        textColor="white"
        backgroundColor="#e92020"
        style={{ position: "sticky" }}
      />
      <Box mt={2} p={2} mx={2}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{hospitalData.hospitalName}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="font-medium">Địa chỉ: </span>
            {hospitalData.hospitalAddress}
            <br className="my-2" />
            <span className="font-medium">Số điện thoại: </span>
            {hospitalData.phoneNumber}
            <br />
            <span className="font-medium">Thời gian hoạt động: </span>
            {hospitalData.billingTime}
            <br />
            <DetailService
              title="Nội Khoa"
              value={hospitalData.inPatient ? "Có" : "Không"}
            />
            <DetailService
              title="Ngoại Khoa"
              value={hospitalData.outPatient ? "Có" : "Không"}
            />
            <DetailService
              title="Nha Khoa"
              value={hospitalData.dental ? "Có" : "Không"}
            />
            <br />
            <DetailService title="Ghi chú" value={hospitalData.note ?? ""} />
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
}

export default DetailPage;
