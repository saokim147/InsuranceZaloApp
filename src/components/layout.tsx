import { AnimationRoutes, Route, Box, useLocation } from "zmp-ui";
import ProfilePage from "@/pages/profile/profile";
import HomePage from "@/pages/index";
import MapPage from "@/pages/map/map";
import BottomNavigationPage from "./bottom-navigation-page";
import DetailPage from "@/pages/index/details";
import LoginPage from "@/pages/login";
import ForgotPasswordPage from "@/pages/forgotpassword";
import TestPage from "@/pages/test";

const Layout = () => {
  const location = useLocation();
  const hiddenRoute = ["/login", "/forgotPassword", ""];
  const showBottomNav = !hiddenRoute.includes(location.pathname);
  return (
    <Box flex flexDirection="column" className="h-screen">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <AnimationRoutes>
          <Route path="/" element={<TestPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/forgotPassword"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route path="/home" element={<HomePage />}></Route>\
          <Route path="/map" element={<MapPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/detail" element={<DetailPage />}></Route>
        </AnimationRoutes>
      </Box>
      {showBottomNav && <BottomNavigationPage />}
    </Box>
  );
};
export default Layout;
