import { coordinate } from "@/types/mapType";
import {
  CheckOtpResponse,
  LoginResponse,
  OtpResponse,
  RefreshTokenResponse,
  SigninResponse,
} from "@/types/userType";
import { apiClient } from "@/utils/interceptor";
import { toQueryParams } from "@/utils/queryUtil";
import { log } from "console";
import { Languages } from "lucide-react";
import { parse } from "path";
import { getAccessToken, getLocation } from "zmp-sdk/apis";
const BASE_URL = "https://api-uat-ibmi.baominh.vn:8500/insurance/Account";

export async function getUserPhoneNumber(
  userAccessToken: string = "",
  token: string = ""
): Promise<any> {
  try {
    const response = await fetch(
      `${BASE_URL}/GetZaloUserLocation?${toQueryParams({
        userAccessToken,
        token,
      })}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUserLocation(
  userAccessToken: string = "",
  token: string = ""
): Promise<any> {
  try {
    const response = await apiClient.get<any>(
      `${BASE_URL}/GetZaloUserLocation?${toQueryParams({
        userAccessToken,
        token,
      })}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserLocationCoordinate(): Promise<coordinate> {
  const [token, code] = await Promise.all([
    new Promise<string>((resolve, reject) => {
      getAccessToken({
        success: (accessToken) => resolve(accessToken),
        fail: (error) => reject(error),
      });
    }),
    new Promise<string | undefined>((resolve, reject) => {
      getLocation({
        success: (data) => resolve(data.token),
        fail: (error) => reject(error),
      });
    }),
  ]);

  if (!code) {
    throw new Error("Location code not available");
  }
  const result = await getUserLocation(token, code);
  console.log("results: ", result.data.latitude);

  return {
    latitude: result.data.latitude,
    longitude: result.data.longitude,
  };
}

export async function getExternalToken(): Promise<SigninResponse> {
  try {
    const response = await apiClient.post<SigninResponse>("/account/sign-in", {
      username: import.meta.env.VITE_EXTERNAL_USERNAME,
      password: import.meta.env.VITE_EXTERNAL_PASSWORD,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRefreshToken(
  accessToken: string,
  refreshToken: string
): Promise<RefreshTokenResponse> {
  try {
    const response = await apiClient.post<RefreshTokenResponse>(
      "/account/refresh-token",
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// lưu vào native storage
export async function login(
  phoneNumber: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>(`/account/login`, {
      UserName: phoneNumber,
      Password1: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getOtpCode(
  sendType: string,
  relatedId: string,
  email: string,
  phoneNumber: string,
  createdBy: string
): Promise<OtpResponse> {
  try {
    const response = await apiClient.post<OtpResponse>(
      `/Account/GeneratorOtp`,
      {
        SendType: sendType,
        RelatedId: relatedId,
        RelatedObject: "ClaimInti",
        Email: email,
        Phone: phoneNumber,
        CreatedBy: createdBy,
        Type: "OTP-CLM-FORM",
        TemplateType: "OTP-CLM-FORM",
        Language: "vi",
        RelatedType: "OT",
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function checkOTPCode(
  code: string,
  createdBy: string
): Promise<CheckOtpResponse> {
  try {
    const response = await apiClient.post<CheckOtpResponse>(
      `/claim/CheckOTPClaimInti`,
      {
        Code: code,
        Language: "VI",
        CreatedBy: createdBy,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
