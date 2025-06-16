import { AnimationRoutes, Route, Box, useLocation } from "zmp-ui";
import ProfilePage from "@/pages/profile/profile";
import HomePage from "@/pages/search/index";
import MapPage from "@/pages/map/map";
import BottomNavigationPage from "./bottom-navigation-page";
import DetailPage from "@/pages/search/details";
import LoginPage from "@/pages/user/login";

import AllowPhonePage from "@/pages/user/allowphone";
import ClaimDetailPage from "./claim/claimDetail";
import ClaimPage from "@/pages/claim";
import MemberPage from "@/pages/claim/member";
import CreateClaimFormPage from "@/pages/claim/createClaimForm";
import OtpMethodPage from "./claim/otpMethod";
import GenerateOtpPage from "./claim/generateOtp";
import ViewPdfPage from "./claim/viewPdf";
import SingleScreenOnboarding from "@/pages/user/onboarding";

const Layout = () => {
  const location = useLocation();
  const hiddenRoute = [
    "/login",
    "/forgotPassword",
    "/detail",
    "/allowPhone",
    "/claimDetail",
    "/createClaim",
    "/updateClaim",
    "/methodOtp",
    "/viewPdf",
    "/generateOTP",
  ];
  const showBottomNav = !hiddenRoute.includes(location.pathname);

  return (
    <Box flex flexDirection="column" className="h-screen">
      <Box className="flex-1 flex flex-col overflow-hidden">
        <AnimationRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createClaim" element={<CreateClaimFormPage />} />
          <Route path="/claim" element={<ClaimPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/allowPhone" element={<AllowPhonePage />} />
          <Route path="/claimDetail" element={<ClaimDetailPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/viewPdf" element={<ViewPdfPage />} />
          <Route path="/methodOtp" element={<OtpMethodPage />} />
          <Route path="/generateOTP" element={<GenerateOtpPage />} />
        </AnimationRoutes>
      </Box>
      {showBottomNav && <BottomNavigationPage />}
    </Box>
  );
};
export default Layout;
