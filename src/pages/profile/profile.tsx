import { Card, CardContent } from "@/components/ui/card";
import { Globe, LogOut } from "lucide-react";
import { Avatar, Box, Header, Page } from "zmp-ui";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const menuItems = [
  { icon: <Globe className="w-5 h-5" />, label: "Languages" },
  { icon: <LogOut className="w-5 h-5" />, label: "Log Out" },
];

const languages = ["English", "Vietnamese"];

export default function ProfileSettings() {
  const [currentLanguage, setLanguage] = useState<string>("Vietnamese");
  return (
    <Page>
      <Header
        title="Profile"
        textColor="white"
        backgroundColor="#e92020"
        style={{ position: "sticky" }}
      ></Header>
      <Box mt={2} p={2}>
        <Card className="p-4 text-center">
          <Avatar size={40} />
          <h2 className="text-lg font-semibold">VHT</h2>
          <p className="text-sm text-gray-500 mb-2">Số điện thoại</p>
        </Card>
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
