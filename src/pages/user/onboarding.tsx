import { Page, Box, Text, Sheet, List, useNavigate } from "zmp-ui";
import onboardingImage from "@/static/onboarding.png";
import { Locate, Search, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { closeApp, nativeStorage } from "zmp-sdk";
import { useEffect } from "react";

export default function SingleScreenOnboarding() {
  const navigation = useNavigate();
  useEffect(() => {
    if (nativeStorage.getItem("profile")) {
      navigation("/claim");
    }
  }, []);

  return (
    <Page>
      <Sheet visible={true}>
        <Box p={4}>
          <div className="flex justify-center align-middle">
            <img alt="onboarding-image" src={onboardingImage} />
          </div>
          <Text.Title className="text-center w-full whitespace-normal mt-4">
            Chào mừng bạn đến với EInsurance !
          </Text.Title>
          <Box mt={6}>
            <List divider={false}>
              <List.Item
                prefix={<Search className="text-primary" />}
                className="p-0 mb-6 [&_.zaui-list-item-content]:mb-0 [&_.zaui-list-item-content]:font-normal [&_.zaui-list-item-content]:text-[15px] [&_.zaui-list-item-content]:leading-5"
              >
                Tra cứu danh sách hồ sơ BLVP,Bảo hiểm viện phí
              </List.Item>
              <List.Item
                prefix={<Locate className="text-primary" />}
                className="p-0 mb-6 [&_.zaui-list-item-content]:mb-0 [&_.zaui-list-item-content]:font-normal [&_.zaui-list-item-content]:text-[15px] [&_.zaui-list-item-content]:leading-5"
              >
                Tìm kiếm bệnh viện gần bạn
              </List.Item>
              <List.Item
                prefix={<StickyNote className="text-primary" />}
                className="p-0 mb-6 [&_.zaui-list-item-content]:mb-0 [&_.zaui-list-item-content]:font-normal [&_.zaui-list-item-content]:text-[15px] [&_.zaui-list-item-content]:leading-5"
              >
                Tạo và quản lí hồ sơ bồi thường
              </List.Item>
            </List>
          </Box>
          <Box flex flexDirection="column" className="gap-2">
            <Button
              className="w-full"
              onClick={() => navigation("/allowPhone")}
            >
              Liên kết số điện thoại
            </Button>
            <Text
              className="text-primary text-center font-bold"
              onClick={() => {
                closeApp({
                  success: () => {
                    console.log("App closed successfully");
                  },
                  fail: (error) => {
                    console.log(error);
                  },
                });
              }}
            >
              Từ chối và thoát
            </Text>
          </Box>
        </Box>
      </Sheet>
    </Page>
  );
}
