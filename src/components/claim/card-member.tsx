import { ClaimMember } from "@/types/claimType";
import Box from "zmp-ui/box";

export default function CardMember({
  claimMember,
}: {
  claimMember: ClaimMember;
}) {
  return (
    <Box
      flex
      flexDirection="column"
      p={3}
      mb={3}
      className="rounded-md border-2 border-neutral-200  bg-white"
    >
      <div>{claimMember.memberCode}</div>
      <div>{claimMember.memberName}</div>
    </Box>
  );
}
