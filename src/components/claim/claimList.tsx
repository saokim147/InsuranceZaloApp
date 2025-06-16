import { ClaimItem } from "@/types/claimType";
import { List } from "zmp-ui";
import CardClaim from "./card-claim";

export default function ClaimList({ list }: { list: ClaimItem[] }) {
  return (
    <List>
      {list.map((value, index) => (
        <CardClaim claimItem={value} key={index} />
      ))}
    </List>
  );
}
