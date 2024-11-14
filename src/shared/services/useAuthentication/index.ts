import axios from "axios";

import { api } from "../config";
import { IUseAuthentication } from "./types";

export const useAuthenticationServices = (): IUseAuthentication => {
  return {
    signIn: async (body) => {
      const { data } = await api.post("/manager/auth/signin", body);

      return data;
    },
    whoAmI: async (ignoreCatch?: boolean) => {
      if (ignoreCatch) {
        const response = await api.get("/manager/me");

        if (!response?.data) return response?.data;

        return {
          ...response.data,
          createdAt: new Date(response.data.createdAt),
        };
      }

      try {
        const response = await api.get("/me");
        return {
          ...response.data,
          createdAt: new Date(response.data.createdAt),
        };
      } catch {
        throw new Error();
      }
    },
    refreshToken: async (refreshToken) => {
      const { data } = await axios.post(
        `${process.env.API_URL}/manager/auth/refresh-token`,
        null,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      return data;
    },
    forgotPassword: async (email: string) => {
      await api.post("/manager/auth/forgot-password", { email });
    },
    resetPassword: async (body) => {
      await api.put("/manager/auth/reset-password", body);
    },
  };
};
