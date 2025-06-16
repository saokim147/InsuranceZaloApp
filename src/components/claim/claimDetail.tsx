import downloadClaim from "@/api/claimApi";
import {
  convertMemberRelationship,
  convertPaymentMethod,
} from "@/utils/common";
import { Box, useLocation, Header, Page, Text, useNavigate } from "zmp-ui";
import { useEffect, useState } from "react";
import ImageViewer from "zmp-ui/image-viewer";
import { ImageExtType } from "@/types/userType";
import { formatStringDate } from "@/utils/date";
import QueryStatus from "../ui/queryStatus";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { PaymentMethod } from "@/types/paymentType";
import getFormData from "@/pages/claim/form/updatedFormData";
import toast from "../ui/sonner";
import { convertBase64toFile, convertBase64ToFileUrl } from "@/utils/file";
import { useClaimDetail } from "@/hooks/useClaimDetail";
import { formatMoney } from "@/utils/money";
import PdfView from "../pdfViewer";
import { DocumentType } from "@/types/fileType";

const ERROR_DETAIL = "Không tìm thấy dữ liệu chi tiết";

export default function ClaimDetailPage() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pdfString, setPDFString] = useState<string>("");
  const [imageList, setImageList] = useState<ImageExtType[]>([]);
  const [invoiceImageList, setInvoiceImageList] = useState<ImageExtType[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);

  const navigation = useNavigate();
  const { t: translate } = useTranslation();
  if (!location.state) {
    return <div>Dont have data please reload the app</div>;
  }
  const claimId = location.state.claimId as string;
  const { data: detailItem, status } = useClaimDetail(claimId);
  useEffect(() => {
    if (location.state?.isSuccessfulUpdate) {
      toast({
        title: "Cập nhật đơn thành công",
        variant: "success",
      });
    }
  }, [location.state?.isSuccessfulUpdate]);

  useEffect(() => {
    if (detailItem && detailItem.documents?.length > 0) {
      const documentList = detailItem.documents;
      const downloadPromises = documentList.map((doc) => {
        return downloadClaim(doc.id);
      });
      Promise.all(downloadPromises).then((results) => {
        const images: ImageExtType[] = [];
        const invoiceImages: ImageExtType[] = [];
        const files: File[] = [];
        for (let i = 0; i < results.length; i++) {
          const fileItem = results[i].model;
          const fileExt = fileItem.ext.slice(1);
          if (fileExt === "pdf") {
            setPDFString(fileItem.file);
          } else {
            const file = convertBase64toFile(
              fileItem.file,
              fileItem.fileName,
              fileItem.ext.slice(1)
            );
            files.push(file);
            if (documentList[i].type === DocumentType.FILE) {
              images.push({
                src: convertBase64ToFileUrl(fileItem.file, fileItem.ext),
                alt: fileItem.fileName,
                description: fileItem.desc,
              });
            } else {
              invoiceImages.push({
                src: convertBase64ToFileUrl(fileItem.file, fileItem.ext),
                alt: fileItem.fileName,
                description: fileItem.desc,
              });
            }
          }
        }
        setFileList(files);
        setImageList(images);
        setInvoiceImageList(invoiceImages);
      });
    }
    if (detailItem && detailItem.documentBeneficial?.length > 0) {
      detailItem;
    }
  }, [detailItem]);

  const paymentMethod = detailItem?.paymentMethod;
  if (!detailItem) return <QueryStatus status={status} />;
  const formData = getFormData(detailItem, fileList);
  return (
    <Page className="bg-gray-100 flex flex-col">
      <Box>
        <Header
          title={translate("claim_detail.title")}
          textColor="black"
          style={{ position: "sticky" }}
          onBackClick={() =>
            navigation("/claim", {
              direction: "backward",
            })
          }
        />
      </Box>

      <Box mt={4} p={2} mx={2} className="flex-1 overflow-auto">
        <Box flex flexDirection="row" justifyContent="space-between" mx={2}>
          <div className="mt-2 mx-3 font-semibold text-lg">
            {translate("claim_detail.member_code")} {detailItem?.code}
          </div>
          <div className="mr-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={async () => {
                navigation("/createClaim", {
                  state: {
                    formData: formData,
                    claimId: claimId,
                    isUpdate: true,
                  },
                  direction: "forward",
                });
              }}
            >
              <PencilIcon size={25} />
            </Button>
          </div>
        </Box>

        <Box
          mx={4}
          mt={2}
          p={4}
          className="rounded-lg bg-white border-2 border-gray-200"
        >
          <Box className="text-primary font-semibold">
            Thông tin người được BH
          </Box>
          <Box mt={2}>
            <Text>Member ID: {detailItem?.member.code}</Text>
            <Box mt={2}>Số HĐBH: {detailItem?.member.policy.code}</Box>
            <Box mt={2}>
              Họ và tên NĐBH:{"  "}
              {detailItem?.beneficiary.lastName +
                " " +
                detailItem?.beneficiary.firstName}
            </Box>
            <Box mt={2}>
              Ngày tháng năm sinh:{"  "}
              {detailItem?.beneficiary.dob
                ? formatStringDate(detailItem.beneficiary.dob)
                : ""}
            </Box>
            <Box mt={2}>
              Ngày bắt đầu bảo hiểm:{"  "}
              {detailItem?.memberHist.effectiveFrom
                ? formatStringDate(detailItem.memberHist.effectiveFrom)
                : ""}
            </Box>
            <Box mt={2}>
              Ngày kết thúc bảo hiểm:{"  "}
              {detailItem?.memberHist.effectiveTo
                ? formatStringDate(detailItem.memberHist.effectiveTo)
                : ""}
            </Box>
            <Box mt={2}>
              Chủ hợp đồng:{"  "}
              {detailItem?.member.policy.customer.shortName}
            </Box>
          </Box>
        </Box>
        <Box
          mx={4}
          mt={2}
          p={4}
          className="rounded-lg bg-white border-2 border-gray-200"
        >
          <Box className="text-primary font-semibold">Thông tin Liên hệ</Box>
          <Box mt={2}>
            Email:{"  "}
            {detailItem?.contactEmail}
          </Box>
          <Box mt={2}>
            Số điện thoại:{"  "}
            {detailItem?.contactPhone}
          </Box>
        </Box>
        <Box
          mx={4}
          mt={2}
          p={4}
          className="rounded-lg bg-white border-2 border-gray-200"
        >
          <Box className="text-primary font-semibold">Thông tin điều trị</Box>
          {detailItem?.medicalFacility && (
            <Box mt={2}>CSYT: {detailItem.medicalFacility.name}</Box>
          )}
          <Box mt={2}>
            Ngày xảy ra sự kiện:{"  "}
            {detailItem?.admissionDate
              ? formatStringDate(detailItem.admissionDate)
              : ""}
          </Box>
          <Box mt={2}>
            Ngày điều trị/nhập viện:{"  "}
            {detailItem?.treatmentDate
              ? formatStringDate(detailItem.treatmentDate)
              : ""}
          </Box>
          <Box mt={2}>
            Ngày xuất viện:{"  "}
            {detailItem?.dischargeDate
              ? formatStringDate(detailItem.dischargeDate)
              : ""}
          </Box>
          <Box mt={2}>Chẩn đoán: {detailItem?.diagnostics}</Box>

          <Box mt={2}>
            Số tiền yêu cầu bồi thường: {formatMoney(detailItem?.requestAmount)}
          </Box>
        </Box>
        <Box mx={4} mt={2} p={4} className="rounded-lg bg-white">
          <Box className="text-primary font-semibold">Hình thức thanh toán</Box>
          <Box mt={2}>
            Tên Người thụ hưởng:{"  "}
            {detailItem?.beneficiary.lastName +
              " " +
              detailItem?.beneficiary.firstName}
          </Box>
          <Box mt={2}>
            Người thụ hưởng:{"  "}
            {detailItem?.beneficiary.lastName +
              " " +
              detailItem?.beneficiary.firstName}
          </Box>
          <Box mt={2}>
            Mối quan hệ :{" "}
            {convertMemberRelationship(detailItem.beneficiary.relationship)}
          </Box>
          <Box mt={2}>
            Thanh toán: {convertPaymentMethod(paymentMethod || "")}
          </Box>
          {paymentMethod === PaymentMethod.CREDIT_TRANSFER && (
            <>
              <Box mt={2}>
                Tên ngân hàng: {detailItem.bankAccount?.bankName}
              </Box>
              <Box mt={2}>
                Số tài khoản: {detailItem.bankAccount?.accountNo}
              </Box>
            </>
          )}
          <Text.Title className="mt-2">Hồ sơ bồi thường</Text.Title>
          <Box mt={2} flex flexDirection="column">
            {imageList.map((image, index) => (
              <Box
                mr={5}
                key={index}
                flex
                flexDirection="row"
                className="gap-1"
              >
                <Box
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    role="presentation"
                    onClick={() => {
                      setActiveIndex(index);
                      setVisible(true);
                    }}
                    src={image.src}
                    alt={image.alt}
                  />
                </Box>
                <div className="my-auto">{image.description}</div>
              </Box>
            ))}
          </Box>
          <Text.Title className="mt-2">Hóa đơn</Text.Title>
          <Box mt={2} flex flexDirection="column">
            {invoiceImageList.map((image, index) => (
              <Box
                mr={5}
                key={index}
                flex
                flexDirection="row"
                className="gap-1"
              >
                <Box
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    role="presentation"
                    onClick={() => {
                      setActiveIndex(index);
                      setVisible(true);
                    }}
                    src={image.src}
                    alt={image.alt}
                  />
                </Box>
                <div className="my-auto">{image.description}</div>
              </Box>
            ))}
          </Box>
          <Text.Title className="mt-2">File YCBT</Text.Title>
          <Box>{pdfString !== "" && <PdfView base64String={pdfString} />}</Box>
        </Box>
      </Box>
      <ImageViewer
        onClose={() => setVisible(false)}
        activeIndex={activeIndex}
        images={imageList}
        visible={visible}
      />
    </Page>
  );
}
