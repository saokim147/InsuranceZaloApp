import { Box, Header, Page, useLocation, useNavigate } from "zmp-ui";
import { Mail, MessageSquare } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function OtpMethodPage() {
  const [otpMethod, setOtpMethod] = useState("Email");
  const location = useLocation();
  const navigation = useNavigate();
  const claimInitId = location.state?.claimInitId as string;
  return (
    <Page className="bg-background flex flex-col">
      <Header
        title="Gửi mã OTP"
        backgroundColor="#e42154"
        textColor="white"
        style={{ position: "sticky" }}
      />
      <Box
        mt={2}
        p={6}
        flex
        flexDirection="column"
        className="bg-background flex-1 overflow-auto rounded-lg outline-1 outline-neutral-200 outline-double"
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Chọn hình thức gửi mã
        </h3>
        <p className="text-base text-muted-foreground mb-6">
          Vui lòng chọn phương thức nhận mã OTP
        </p>

        <RadioGroup
          defaultValue="Email"
          className="flex flex-col space-y-4"
          value={otpMethod}
          onValueChange={setOtpMethod}
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground">
            <RadioGroupItem value="Email" id="email" />
            <Mail className="w-5 h-5 text-muted-foreground" />
            <Label htmlFor="email" className="flex-1">
              Gửi qua Email
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground">
            <RadioGroupItem value="SMS" id="sms" />
            <MessageSquare className="w-5 h-5 text-muted-foreground" />
            <Label htmlFor="sms" className="flex-1">
              Gửi qua SMS
            </Label>
          </div>
        </RadioGroup>
        <Box mt={6} flex justifyContent="center">
          <Button
            className="w-full  hover:bg-primary/90"
            onClick={() => {
              navigation("/generateOTP", {
                state: { claimInitId: claimInitId, otpMethod: otpMethod },
              });
            }}
          >
            Gửi đi
          </Button>
        </Box>
      </Box>
    </Page>
  );
}
