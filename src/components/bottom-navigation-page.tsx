import { useState } from "react";
import { BottomNavigation } from "zmp-ui";
import { FilePlus } from "lucide-react";
import { HomeIcon } from "./icons/homeIcon";
import { MapIcon } from "./icons/mapIcon";
import { UserIcon } from "./icons/userIcon";
import { ClaimIcon } from "./icons/claimIcon";

function BottomNavigationPage() {
  const [activeTab, setActiveTab] = useState("claim");
  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
      className="border border-gray-200"
    >
      <BottomNavigation.Item
        label="Quản lí HSBT"
        key="claim"
        icon={<ClaimIcon />}
        activeIcon={<ClaimIcon />}
        linkTo="/claim"
        className="font-semi"
      />
      <BottomNavigation.Item
        label="Tìm kiếm"
        key="home"
        icon={<HomeIcon />}
        activeIcon={<HomeIcon />}
        linkTo="/home"
      />
      <BottomNavigation.Item
        label="Định vị"
        key="map"
        icon={<MapIcon />}
        activeIcon={<MapIcon />}
        linkTo="/map"
      />
      <BottomNavigation.Item
        label="Tài khoản"
        key="account"
        icon={<UserIcon />}
        activeIcon={<UserIcon />}
        linkTo="/profile"
      />
    </BottomNavigation>
  );
}

export default BottomNavigationPage;
