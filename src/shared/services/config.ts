import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { unstable_batchedUpdates } from "react-dom";
import { toast } from "react-toastify";

import { useSession } from "@store";

import { useAuthenticationServices } from "./useAuthentication";

export const api = axios.create({
  baseURL: `${process.env.API_URL}`,
});

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies();
  const hasSession = Object.keys(cookies).some(
    (key) => key === "@vanguard-manager-session"
  );

  let accessToken = "";

  if (hasSession) {
    const storedSession = JSON.parse(cookies["@vanguard-manager-session"]);
    accessToken = storedSession.accessToken;
  }

  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken } = useAuthenticationServices();
    const { destroySession } = useSession.getState();
    const storedSession = parseCookies();

    const hasSession = Object.keys(storedSession).includes(
      "@vanguard-manager-session"
    );

    const isUnauthorized = hasSession && error?.response?.status === 401;

    const errorMessage = error?.response?.data?.message;

    if (isUnauthorized) {
      try {
        const session = JSON.parse(storedSession["@vanguard-manager-session"]);

        const data = await refreshToken(session?.refreshToken);

        setCookie(
          null,
          "@vanguard-manager-session",
          JSON.stringify({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );

        return api(error.config);
      } catch {
        unstable_batchedUpdates(() => {
          destroySession();
        });
        toast.warn("Sua sessão expirou. Faça login novamente.");
      }
      return Promise.reject(errorMessage);
    }
    return Promise.reject(errorMessage);
  }
);
