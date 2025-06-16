import { useState } from "react";
import { Box, Page, Sheet, useNavigate, Text } from "zmp-ui";
import appicon from "@/static/appicon.svg";
import { Button } from "@/components/ui/button";
import { getAccessToken, getLocation, nativeStorage } from "zmp-sdk/apis";
import { getUserLocation } from "@/api/userApi";
import { coordinate } from "@/types/mapType";

export default function AllowLocation() {
  const [sheetVisible, setSheetVisible] = useState(true);
  const navigate = useNavigate();
  if (nativeStorage.getItem("location")) {
    navigate("/map");
  }
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
            <Text>
              Cho Phép EInsurance Lấy Tọa độ người dùng để tìm kiếm CSYT gần
              nhất
            </Text>
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
                  Promise.all([
                    new Promise<string | undefined>((resolve, reject) => {
                      getLocation({
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
                        return;
                      }
                      const result = await getUserLocation(token, code);
                      const parseData = JSON.parse(result);
                      const location: coordinate = {
                        latitude: parseData.data.latitude,
                        longitude: parseData.data.longitude,
                      };
                      navigate("/map", {
                        state: {
                          location: location,
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
