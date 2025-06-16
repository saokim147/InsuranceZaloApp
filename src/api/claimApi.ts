import {
  ClaimApiRequest,
  ClaimApiResponse,
  ClaimDetailResponse,
  ClaimPayload,
  DeleteClaimResponse,
  DownloadFileResponse,
  MedicalListReponse,
  MemberListRepsonse,
  PrintPDFResponse,
  UpdateClaimResponse,
} from "@/types/claimType";
import { MemberDetailResponse } from "@/types/userType";
import { apiClient } from "@/utils/interceptor";
import { toQueryParams } from "@/utils/queryUtil";

export async function getPagedClaimList(
  claimApiRquest: ClaimApiRequest
): Promise<ClaimApiResponse> {
  try {
    const response = await apiClient.post<ClaimApiResponse>(
      "/Claim/QueryClaim/VmClaimIntiView",
      claimApiRquest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getClaimDetail(Id: string): Promise<ClaimDetailResponse> {
  try {
    const response = await apiClient.post<ClaimDetailResponse>(
      "/Claim/QueryClaim/ClaimintiModalView",
      {
        Id: Id,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMedicalFacilities(
  Page: number,
  Limit: number,
  NameUnsign: string
): Promise<MedicalListReponse> {
  try {
    const listItem = await apiClient.post<MedicalListReponse>(
      `/DataCommon/QueryDataCommon/MedicalFacilityView`,
      {
        Page: Page,
        Limit: Limit,
        NameUnsign: NameUnsign,
      }
    );
    return listItem.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserFamilyMembers(
  userId: string
): Promise<MemberListRepsonse> {
  try {
    const memberlist = await apiClient.post<MemberListRepsonse>(
      `/Claim/QueryClaim/RelationShipMemberView`,
      {
        UserId: userId,
      }
    );
    return memberlist.data;
  } catch (error) {
    throw error;
  }
}

export default async function downloadClaim(
  documentId: string
): Promise<DownloadFileResponse> {
  try {
    const response = await apiClient.post<DownloadFileResponse>(
      `/Document/Download?${toQueryParams({ documentId })}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMemberInfo(
  code: string
): Promise<MemberDetailResponse> {
  try {
    const response = await apiClient.post<MemberDetailResponse>(
      `/claim/QueryClaim/LoadInforMember`,
      {
        Code: code,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMemberBeneficialInfo(
  id: string,
  relatedId: string,
  code: string
): Promise<MemberDetailResponse> {
  try {
    const response = await apiClient.post<MemberDetailResponse>(
      `/claim/QueryClaim/MemberView`,
      {
        UserId: id,
        RelatedId: relatedId,
        Code: code,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createClaim(
  claimPayLoad: ClaimPayload,
  documentFiles: File[] = [],
  fileOtherFiles: File[] = [],
  invoiceFiles: File[] = []
): Promise<UpdateClaimResponse> {
  try {
    const formData = new FormData();
    formData.append("JsonOthers", JSON.stringify(claimPayLoad));
    [...documentFiles, ...fileOtherFiles].forEach((file) =>
      formData.append("FileOther", file)
    );
    invoiceFiles.forEach((file) => formData.append("FileInvoice", file));
    const response = await apiClient.post("/claim/declare/0", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateClaim(
  claimPayLoad: ClaimPayload,
  documentFiles: File[] = [],
  fileOtherFiles: File[] = [],
  invoiceFiles: File[] = []
): Promise<UpdateClaimResponse> {
  const formData = new FormData();
  formData.append("JsonOthers", JSON.stringify(claimPayLoad));
  [...documentFiles, ...fileOtherFiles].forEach((file) =>
    formData.append("FileOther", file)
  );
  invoiceFiles.forEach((file) => formData.append("FileInvoice", file));
  const response = await apiClient.post("/claim/declare/1", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteClaim(id: string, claimInitId: string) {
  try {
    const response = await apiClient.post<DeleteClaimResponse>(
      `/claim/declare/3`,
      new URLSearchParams({
        JsonOthers: JSON.stringify({
          Id: id,
          RecipientBy: claimInitId,
        }),
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function printPdf(claimInitId: string) {
  try {
    const response = await apiClient.post<PrintPDFResponse>(`/Print/printPdf`, {
      ClaimIntiId: claimInitId,
      Code: "YCBT",
      Language: "VI",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// export async function listMemberBenficiaryInfo(userId: string, code: string) {
//   try {
//     const response=await apiClient.post<>
//   } catch (error) {
//     throw error;
//   }
// }
