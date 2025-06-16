import { createClaim, updateClaim } from "@/api/claimApi";
import { ClaimFormType } from "@/schema";
import { convertToClaimPayload } from "@/utils/common";

export const handleClaimSubmission = async (
  data: ClaimFormType,
  isUpdate: boolean
) => {
  const claimPayload = convertToClaimPayload(data);
  const documentFiles = data.documents.map((doc: { file: File }) => doc.file);
  const fileOtherFiles = data.fileOther.map((doc: { file: File }) => doc.file);
  const invoiceFiles = data.fileOther.map((doc: { file: File }) => doc.file);
  return isUpdate
    ? await updateClaim(
        claimPayload,
        documentFiles,
        fileOtherFiles,
        invoiceFiles
      )
    : await createClaim(
        claimPayload,
        documentFiles,
        fileOtherFiles,
        invoiceFiles
      );
};
