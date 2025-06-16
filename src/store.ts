import { create } from "zustand";
import { Tokens } from "./types/userType";
interface TokenState {
  tokens: Tokens;
  updateTokens: (newTokens: Partial<Tokens>) => void;
  loadTokens: () => void;
}

export const useWebTokenStore = create<TokenState>()((set) => ({
  tokens: {
    accessToken: "",
    refreshToken: "",
    tokenExpireAt: "",
    refreshTokenAt: "",
  },
  updateTokens: (newTokens) => {
    set((state) => {
      const mergedTokens = { ...state.tokens, ...newTokens };
      localStorage.setItem("tokens", JSON.stringify(mergedTokens));
      return { tokens: mergedTokens };
    });
  },
  loadTokens: () => {
    const storedToken = JSON.parse(
      localStorage.getItem("tokens") ?? ""
    ) as Tokens;
    set({ tokens: storedToken });
  },
}));
