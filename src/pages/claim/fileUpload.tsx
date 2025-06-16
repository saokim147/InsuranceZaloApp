import { useFormContext, useFieldArray } from "react-hook-form";
import { ClaimFormType } from "@/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, PlusIcon, Upload, UserSearch } from "lucide-react";
import Box from "zmp-ui/box";
import { useNavigate } from "react-router-dom";
import { chooseImage } from "zmp-sdk/apis";
import ErrorMessage from "@/components/ui/errorValidation";
import { FileItem } from "@/components/claim/fileItem";

import { useState } from "react";
import { Checkbox } from "zmp-ui";
import useMutliStepFormContext from "@/hooks/useClaimFormContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function FileUploadPage() {
  const navigate = useNavigate();
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<ClaimFormType>();
  const currentValues = getValues();
  const hasDocuments =
    currentValues.documents && currentValues.documents.length > 0;
  const hasFileOther =
    currentValues.fileOther && currentValues.fileOther.length > 0;
  const hasInvoice =
    currentValues.fileInvoice && currentValues.fileInvoice.length > 0;

  const context = useMutliStepFormContext();
  const memberId = getValues().memberId;
  const memberBeneficialId = getValues().memberBenificialId;
  const {
    fields: documentField,
    append: documentAppend,
    remove: documentRemove,
  } = useFieldArray({
    control,
    name: "documents",
  });
  const {
    fields: fileOtherField,
    append: fileOtherAppend,
    remove: fileOtherRemove,
  } = useFieldArray({
    control,
    name: "fileOther",
  });
  const {
    fields: invoiceField,
    append: invoiceAppend,
    remove: invoiceRemove,
  } = useFieldArray({
    control,
    name: "fileInvoice",
  });
  const [fileType, setFileType] = useState("beneficiary");
  const handleAddFiles = async (fileType: string) => {
    const { tempFiles } = await chooseImage({
      count: 5,
      cameraType: "back",
      sourceType: ["album", "camera"],
    });
    if (tempFiles && tempFiles.length > 0) {
      const newFiles = await Promise.all(
        tempFiles.map(async (temp) => {
          const res = await fetch(temp.path);
          const blob = await res.blob();
          const date = Date.now().toString();
          const uploadedFile = new File([blob], `Upload-${date}.jpg`, {
            type: blob.type,
          });
          return {
            file: uploadedFile,
          };
        })
      );
      if (fileType === "beneficiary") documentAppend(newFiles);

      if (fileType === "relative") fileOtherAppend(newFiles);

      if (fileType === "invoice") invoiceAppend(newFiles);
    }
  };
  const handleDeleteFiles = async (fileType: string, index: number) => {
    if (fileType === "beneficiary") documentRemove(index);
    if (fileType === "relative") fileOtherRemove(index);
    if (fileType === "invoice") invoiceRemove(index);
  };
  return (
    <Box
      mt={2}
      p={6}
      className="bg-background rounded-lg outline-1 outline-neutral-200 outline-double relative"
    >
      <Button
        onClick={() => context.prev()}
        variant="ghost"
        size="icon"
        type="button"
        className="absolute left-4 top-4 hover:bg-gray-100  text-foreground rounded-full"
      >
        <ArrowLeft />
      </Button>
      <h3 className="text-center text-xl font-semibold text-foreground">
        Tải file
      </h3>
      <div className="text-center text-base  text-muted-foreground">
        Lấy ảnh từ máy hoặc chụp ảnh
      </div>
      <Box mt={3}>
        <RadioGroup
          defaultValue="beneficiary"
          className="flex flex-row space-x-2 justify-center"
          onValueChange={(value) => setFileType(value)}
        >
          <div className="flex items-center">
            <RadioGroupItem value="invoice" id="option-one" />
            <Label htmlFor="option-one" className="ml-2">
              Hóa đơn
            </Label>
          </div>
          {memberId !== memberBeneficialId && (
            <div className="flex items-center">
              <RadioGroupItem value="relative" id="option-two" />
              <Label htmlFor="option-two" className="ml-2">
                Chứng từ quan hệ người thân
              </Label>
            </div>
          )}

          <div className="flex items-center">
            <RadioGroupItem value="beneficiary" id="option-three" />
            <Label htmlFor="option-three" className="ml-2">
              Hồ sơ
            </Label>
          </div>
        </RadioGroup>
      </Box>
      <Box mt={3} flex flexDirection="row" className="gap-2">
        <Button
          variant="outline"
          type="button"
          className="text-primary hover:bg-white hover:text-primary/90 flex-1"
          onClick={() => handleAddFiles(fileType)}
        >
          <PlusIcon />
          Thêm file
        </Button>
        <Button variant="destructive">
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Box>
      <Box mt={2} flex flexDirection="column">
        <div className="text-base text-md">Hóa đơn</div>
        {hasInvoice &&
          currentValues.fileInvoice.map((doc, index) => (
            <FileItem
              key={index}
              index={index}
              remove={() => handleDeleteFiles("invoice", index)}
              doc={doc}
            />
          ))}
        {invoiceField.map((doc, index) => (
          <FileItem
            key={index}
            index={index}
            remove={() => handleDeleteFiles("invoice", index)}
            doc={doc}
          />
        ))}
      </Box>
      <Box mt={2} flex flexDirection="column">
        <div className="text-base text-md">Chứng từ người thân</div>
        {hasFileOther &&
          currentValues.fileOther.map((doc, index) => (
            <FileItem
              key={index}
              index={index}
              remove={() => handleDeleteFiles("invoice", index)}
              doc={doc}
            />
          ))}
        {fileOtherField.map((doc, index) => (
          <FileItem
            key={index}
            index={index}
            remove={fileOtherRemove}
            doc={doc}
          />
        ))}
      </Box>
      <Box mt={2} flex flexDirection="column">
        <div className="text-base text-md">Hồ sơ</div>
        {hasDocuments &&
          currentValues.documents.map((doc, index) => (
            <FileItem
              key={index}
              index={index}
              remove={() => handleDeleteFiles("invoice", index)}
              doc={doc}
            />
          ))}
        {documentField.map((doc, index) => (
          <FileItem
            key={index}
            index={index}
            remove={documentRemove}
            doc={doc}
          />
        ))}
      </Box>
      <ErrorMessage message={errors.documents?.message} />
    </Box>
  );
}
