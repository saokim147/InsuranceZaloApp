import { getClaimDetail } from "@/api/claimApi";
import { ClaimDetailItem, ClaimDetailResponse } from "@/types/claimType";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useClaimDetail(
  claimId: string
): UseQueryResult<ClaimDetailItem> {
  return useQuery({
    queryKey: ["claimDetail", claimId],
    queryFn: async () => {
      const response = await getClaimDetail(claimId);
      return response.model[0];
    },
    enabled: !!claimId,
  });
}
