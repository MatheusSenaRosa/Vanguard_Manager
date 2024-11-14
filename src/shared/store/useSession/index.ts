import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { create } from "zustand";

import { useAuthenticationServices } from "@services";

import { IUseSession, IUser } from "./types";

export const useSession = create<IUseSession>((set) => {
  const { whoAmI } = useAuthenticationServices();

  return {
    user: undefined,
    isLoggingOut: false,

    createSession: (apiResponse) => {
      setCookie(
        null,
        "@vanguard-manager-session",
        JSON.stringify({
          role: apiResponse.role,
          accessToken: apiResponse.accessToken,
          refreshToken: apiResponse.refreshToken,
        })
      );

      const user: IUser = {
        id: apiResponse.id,
        name: apiResponse.name,
        role: apiResponse.role,
        email: apiResponse.email,
      };

      set({ user });
    },
    restoreSession: async () => {
      const { ["@vanguard-manager-session"]: storedSession } = parseCookies();

      if (storedSession) {
        const me = await whoAmI(true);

        if (!me) {
          set({ user: null });
          return;
        }

        const user: IUser = {
          id: me.id,
          name: me.name,
          email: me.email,
          role: me.role,
        };

        set({ user });
        return;
      }

      set({ user: null });
    },
    destroySession: async () => {
      destroyCookie(null, "@vanguard-manager-session");
      set({ isLoggingOut: true });
      await Router.push("/");

      set({ user: null, isLoggingOut: false });
    },
  };
});
