import { signIn } from "@/api/userApi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Box, Page } from "zmp-ui";

export default function TestPage() {
  const [externalToken, setExternalToken] = useState<string>("");
  return (
    <Page>
      <Box p={5}>
        <Button onClick={() => signIn("vhthinh", "bmi@123")}>
          test call api
        </Button>
        <div>External Token: {externalToken}</div>
      </Box>
    </Page>
  );
}
