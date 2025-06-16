import { Card, CardContent } from "@/components/ui/card";
import { Cake, Globe, LogOut, Mail } from "lucide-react";
import { Avatar, Box, Page } from "zmp-ui";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { nativeStorage, UserInfo } from "zmp-sdk";
import { formatStringDate } from "@/utils/date";
import { AppProfile } from "@/types/userType";
import { AppError, getUserInfo } from "zmp-sdk/apis";
import { userInfo } from "os";

const menuItems = [
  { icon: <Globe className="w-5 h-5" />, label: "Languages" },
  { icon: <LogOut className="w-5 h-5" />, label: "Log Out" },
];

const languages = ["English", "Vietnamese"];

export default function ProfileSettings() {
  const [currentLanguage, setLanguage] = useState<string>("Vietnamese");
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { userInfo } = await getUserInfo({
          autoRequestPermission: true,
        });
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const profile = JSON.parse(nativeStorage.getItem("profile")) as AppProfile;

  return (
    <Page className="bg-white rounded-lg ">
      <Box p={2} mt={10} className="h-screen z-10">
        <Box p={4} className="text-center">
          <Avatar size={100} src={userInfo?.avatar} />
          <p className="text-base text-gray-500">{profile.phoneNumber}</p>
        </Box>
        <Box className=" text-center">
          <span className="inline-flex gap-1">{userInfo?.name}</span>
        </Box>
        <Box className="text-gray-500 text-center">
          <span className="inline-flex gap-1">
            <Mail className="text-gray-500" size={20} />
            {profile.email}
          </span>
        </Box>

        <Card className="mt-4">
          <CardContent className="p-2 divide-y">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
              >
                {item.label === "Languages" ? (
                  <>
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        currentLanguage == "English"
                          ? setLanguage("Vietnamese")
                          : setLanguage("English")
                      }
                    >
                      {currentLanguage}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span>&gt;</span>
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
}
