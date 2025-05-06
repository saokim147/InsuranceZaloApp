import { toQueryParams } from "@/utils/queryUtil";
import { ParseStatus } from "zod";
// https://localhost:7252
//  https://7a02-2001-ee0-4f04-dc20-5831-cb0c-ed48-4ec3.ngrok-free.app
const API_BASE_URL =
  "https://7a02-2001-ee0-4f04-dc20-5831-cb0c-ed48-4ec3.ngrok-free.app/Account";

const EXTERNAL_API_BASE_URL = "https://api-uat-ibmi.baominh.vn:8500/account";

export async function getUserPhoneNumber(
  userAccessToken: string = "",
  token: string = ""
) {
  const params = {
    userAccessToken,
    token,
  };
  const url = `${API_BASE_URL}/GetZaloUserLocation?${toQueryParams(
    params
  ).toString()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(
  password: string,
  confirmPassword: string
) {}

// đều phải gọi khi muốn xác thực
export async function getExternalToken(username: string, password: string) {
  const url = `${EXTERNAL_API_BASE_URL}/sign-in`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// trả về token rồi lưu vào storage  để sau này này ko cần phải đăng nhập lại
export async function login(phoneNumber: string, password: string) {
  const url = `${EXTERNAL_API_BASE_URL}/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: phoneNumber,
        Password1: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(username: string, password: string) {
  const url = `${EXTERNAL_API_BASE_URL}/sign-in`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function validateUsername(userName: string) {}

// /DataCommon/QueryDataCommon/MedicalFacilityView
// /Claim/QueryClaim/RelationShipMemberView
//  Tạo yêu cầu bồi thường    /declare/{operation}
