import { useState } from "react";
import { BottomNavigation } from "zmp-ui";
import { HomeIcon, MapIcon, User } from "lucide-react";

function BottomNavigationPage() {
  const [activeTab, setActiveTab] = useState("chat");
  return (
    <BottomNavigation
      fixed
      activeKey={activeTab}
      onChange={(key) => setActiveTab(key)}
    >
      <BottomNavigation.Item
        label="Home"
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
        icon={<User />}
        activeIcon={<User />}
        linkTo="/profile"
      />
    </BottomNavigation>
  );
}

export default BottomNavigationPage;
