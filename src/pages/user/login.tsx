import { useForm, SubmitHandler } from "react-hook-form";
import { Page, Box, Text, useNavigate, useLocation, Spinner } from "zmp-ui";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import appicon from "@/static/appicon.svg";
import { login } from "@/api/userApi";
import { nativeStorage } from "zmp-sdk";
interface LoginFormInputs {
  phoneNumber: string;
  password: string;
}
const ERROR_PASSWORD = "Mật khẩu sai xin hãy nhập lại";
const ERROR_REQUIRED_PASSWORD = "Mật khẩu không được để trống";
const SERVER_ERROR = "Đã xảy ra lỗi. Vui lòng thử lại.";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state.phoneNumber;
  console.log(phoneNumber);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const loginResults = await login(data.phoneNumber, data.password);
      if (loginResults.success === false) {
        setError("root.passwordError", {
          type: "validate",
          message: ERROR_PASSWORD,
        });
        setMessage(ERROR_PASSWORD);
        setLoading(false);
        return;
      }
      const userProfile = loginResults.model[0].userProfiles[0];
      nativeStorage.setItem(
        "profile",
        JSON.stringify({
          dateOfBirth: userProfile.dob,
          userId: userProfile.userId,
          phoneNumber: userProfile.phone,
          email: userProfile.email,
        })
      );
      navigate("/claim");
    } catch (error) {
      console.error("Login error:", error);
      setError("root.passwordError", {
        type: "validate",
        message: SERVER_ERROR,
      });
      setMessage(SERVER_ERROR);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page className="bg-white flex flex-col justify-center relative">
      <div className="flex justify-center">
        <img src={appicon} className="size-24" />
      </div>
      <Box p={5} flex flexDirection="column">
        <Text.Title className="mb-4" size="large">
          Đăng nhập
        </Text.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={3}>
            <Label htmlFor="phoneNumber" className="text-base">
              Số điện thoại
            </Label>
            <Input
              id="phoneNumber"
              type="text"
              defaultValue={phoneNumber}
              readOnly
              disabled
              className="mt-2"
              {...register("phoneNumber")}
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="password" className="text-base">
              Mật khẩu
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="mt-2"
              {...register("password", {
                required: ERROR_REQUIRED_PASSWORD,
              })}
            />
            {errors.password && (
              <Text className="text-orange-500 mt-1">
                {errors.password.message}
              </Text>
            )}
          </Box>
          <div>{message}</div>
          <Button type="submit" className="w-full font-bold">
            Login
          </Button>

          {loading && (
            <Box mt={2} className="flex items-center justify-center">
              <Spinner visible />
            </Box>
          )}
        </form>
      </Box>
    </Page>
  );
}
