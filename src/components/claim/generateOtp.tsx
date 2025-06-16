import { Box, Header, Page, Input, useLocation, useNavigate } from "zmp-ui";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkOTPCode, getOtpCode } from "@/api/userApi";
import toast from "../ui/sonner";
import { nativeStorage } from "zmp-sdk";
import { AppProfile } from "@/types/userType";
//   navigation("/generateOTP", {
//                 state: { claimInitId: claimInitId, otpMethod: otpMethod },
//               });
export default function GenerateOtpPage() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const navigation = useNavigate();
  const claimInitId = location.state?.claimInitId;
  const otpMethod = location.state?.otpMethod;
  const profile = JSON.parse(nativeStorage.getItem("profile")) as AppProfile;
  const userId = profile.userId;
  const email = profile.email;
  const phoneNumber = profile.phoneNumber;
  //const userId = "59d337c9-386a-46c4-8813-8ac10127b7ba";
  useEffect(() => {
    const requestInitialOtp = async () => {
      try {
        const response = await getOtpCode(
          otpMethod,
          claimInitId,
          email,
          phoneNumber,
          userId
        );
        if (!response.success) {
          toast({
            title: "Lỗi tham số xin hãy kiểm tra lại các bước",
            variant: "error",
          });
        }
      } catch (error) {
        toast({
          title: "Lỗi hệ thống xin hãy thử lại",
          variant: "error",
        });
      }
    };
    requestInitialOtp();
  }, []);

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(countdown as NodeJS.Timeout);
  }, [timer]);

  const handleResendOtp = async () => {
    setIsResending(true);
    await getOtpCode(otpMethod, claimInitId, email, phoneNumber, userId);
    setIsResending(false);
  };

  const handleVerifyOtp = async () => {
    const checkOtpResponse = await checkOTPCode(otp, userId);
    if (checkOtpResponse.success) {
      toast({
        title: "Xác thực OTP thành công",
        variant: "success",
      });
      navigation("/claim");
    }
  };
  return (
    <Page className="bg-background flex flex-col">
      <Header
        title="Nhập mã OTP"
        backgroundColor="#e42154"
        textColor="white"
        style={{ position: "sticky" }}
      />
      <Box
        mt={2}
        mx={4}
        p={6}
        flex
        flexDirection="column"
        className="bg-background flex-1 overflow-auto rounded-lg border-card h-[200px]"
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Xác thực OTP
        </h3>
        <div>{otp}</div>
        <p className="text-base text-muted-foreground mb-6">
          Vui lòng nhập mã OTP đã được gửi đến số điện thoại của bạn
        </p>
        <Input.OTP
          show
          otpLength={6}
          value={otp}
          defaultValue=""
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleVerifyOtp}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={otp.length !== 6}
          >
            Xác nhận
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleResendOtp}
              disabled={timer > 0 || isResending}
              className="text-primary hover:text-primary/90"
            >
              Gửi lại mã
            </Button>
            {timer > 0 && (
              <span className="text-sm text-muted-foreground">({timer}s)</span>
            )}
          </div>
        </div>
      </Box>
    </Page>
  );
}
