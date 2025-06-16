import { Button } from "@/components/ui/button";
import { Box, Page, Sheet, Text } from "zmp-ui";
import { useState } from "react";
import appicon from "@/static/appicon.svg";
import { getAccessToken, getPhoneNumber } from "zmp-sdk";
import { useNavigate } from "zmp-ui";
import { getUserPhoneNumber } from "@/api/userApi";
import { formatPhoneNumber } from "@/utils/common";
import { ParsingError } from "maplibre-gl";
export default function AllowPhonePage() {
  const [sheetVisible, setSheetVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <Page>
      <Sheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        autoHeight
        mask
        handler
        swipeToClose
      >
        <Box p={4} flex flexDirection="column">
          <div className="flex justify-center">
            <img src={appicon} className="size-24" />
          </div>
          <Box style={{ overflowY: "auto" }}>
            <Text>Cho Phép EInsurance lấy số điện thoại của bạn</Text>
          </Box>
          <Box flex flexDirection="row" mt={5}>
            <Box style={{ flex: 1 }}>
              <Button variant="secondary" className="w-full">
                Thoát
              </Button>
            </Box>
            <Box style={{ flex: 1 }} pl={2}>
              <Button
                className="w-full"
                onClick={() => {
                  // First, get both phone number token and access token
                  Promise.all([
                    new Promise<string | undefined>((resolve, reject) => {
                      getPhoneNumber({
                        success: (data) => resolve(data.token),
                        fail: (error) => reject(error),
                      });
                    }),
                    new Promise<string>((resolve, reject) => {
                      getAccessToken({
                        success: (accessToken) => resolve(accessToken),
                        fail: (error) => reject(error),
                      });
                    }),
                  ])
                    .then(async ([code, token]) => {
                      if (!code) {
                        console.log("Phone number token is undefined");
                        return;
                      }
                      const result = await getUserPhoneNumber(token, code);
                      const phoneNumber = formatPhoneNumber(result.data.number);
                      console.log(phoneNumber);
                      navigate("/login", {
                        state: {
                          phoneNumber: phoneNumber,
                        },
                        direction: "forward",
                      });
                      setSheetVisible(false);
                    })
                    .catch((error) => {
                      console.error("Error getting tokens:", error);
                    });
                }}
              >
                Cho phép
              </Button>
            </Box>
          </Box>
        </Box>
      </Sheet>
    </Page>
  );
}
