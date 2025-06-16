import { useWebTokenStore } from "@/store";
import axios, { AxiosError, AxiosInstance } from "axios";
import {
  convertFromRefreshTokenResponse,
  convertToTokens,
  isExpired,
} from "./common";
import { getExternalToken, getRefreshToken } from "@/api/userApi";

const EXTERNAL_API_BASE_URL = "https://api-uat-ibmi.baominh.vn:8500";

export const apiClient: AxiosInstance = axios.create({
  baseURL: EXTERNAL_API_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const { tokens, updateTokens } = useWebTokenStore.getState();
    if (
      config.url?.includes("/refresh-token") ||
      config.url?.includes("/sign-in")
    ) {
      return config;
    }

    if (tokens.accessToken === "") {
      const newTokens = await getExternalToken();
      updateTokens(convertToTokens(newTokens));
    }

    if (isExpired(useWebTokenStore.getState().tokens.tokenExpireAt)) {
      const newToken = await getRefreshToken(
        tokens.accessToken,
        tokens.refreshToken
      );
      updateTokens(convertFromRefreshTokenResponse(newToken));
    }
    if (isExpired(useWebTokenStore.getState().tokens.refreshTokenAt)) {
      const newTokens = await getExternalToken();
      updateTokens(convertToTokens(newTokens));
    }
    const updatedTokens = useWebTokenStore.getState().tokens;
    config.headers.Authorization = `Bearer ${updatedTokens.accessToken}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { tokens, updateTokens } = useWebTokenStore.getState();
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    if (originalRequest._retry || originalRequest.url.includes("/sign-in")) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;
    try {
      const newToken = await getRefreshToken(
        tokens.accessToken,
        tokens.refreshToken
      );
      updateTokens(convertFromRefreshTokenResponse(newToken));
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);
