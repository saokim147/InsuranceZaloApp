import { Box, Page, Header, useLocation } from "zmp-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberPage from "./member";
import ClaimResultPage from "./claimResult";
import { showToast } from "zmp-sdk";
import { useEffect } from "react";
import toast from "@/components/ui/sonner";

export default function ClaimPage() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.isSuccessfulCreate) {
      toast({
        title: "Tạo đơn thành công",
        variant: "success",
      });
    }
  }, [location.state?.isSuccessfulUpdate]);

  return (
    <Page className="bg-background flex flex-col">
      <Header
        title="Hồ sơ bồi thường"
        textColor="#0a0a0a"
        style={{ position: "sticky", boxShadow: "revert" }}
        showBackIcon={false}
      />
      <Box mt={2} p={2} className="flex-1 overflow-auto">
        <Tabs defaultValue="claim">
          <TabsList className="flex mx-3">
            <TabsTrigger value="claim" className="flex-1">
              Danh sách BLVP
            </TabsTrigger>
            <TabsTrigger value="member" className="flex-1">
              DS người được bảo hiểm
            </TabsTrigger>
          </TabsList>
          <TabsContent value="claim">
            <ClaimResultPage />
          </TabsContent>
          <TabsContent value="member">
            <MemberPage />
          </TabsContent>
        </Tabs>
      </Box>
    </Page>
  );
}
