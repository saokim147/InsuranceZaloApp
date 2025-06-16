import { getUserFamilyMembers } from "@/api/claimApi";
import { MemberListRepsonse } from "@/types/claimType";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useUserFamilyMembers = (
  userId: string
): UseQueryResult<MemberListRepsonse> => {
  return useQuery({
    queryKey: ["memberList"],
    queryFn: async () => {
      const response = await getUserFamilyMembers(userId);
      return response;
    },
  });
};
