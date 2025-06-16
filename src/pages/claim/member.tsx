import { Box } from "zmp-ui";
import CardMember from "../../components/claim/card-member";
import QueryStatus from "@/components/ui/queryStatus";
import { useUserFamilyMembers } from "@/hooks/useUserFamilyMembers";

export default function MemberPage() {
  // const profile = JSON.parse(nativeStorage.getItem("profile")) as AppProfile;
  const userId = "59d337c9-386a-46c4-8813-8ac10127b7ba";
  const { data: memberList, status } = useUserFamilyMembers(userId);
  if (!memberList) return <QueryStatus status={status} />;
  return (
    <Box flex flexDirection="column" p={3}>
      {memberList.model.map((value, index) => (
        <CardMember claimMember={value} key={index} />
      ))}
    </Box>
  );
}
