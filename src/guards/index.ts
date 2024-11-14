import { parseCookies } from "nookies";

import { routes } from "@utils";

import { ValidateRoutePermission } from "./types";

export const validateRoutePermission: ValidateRoutePermission = (ctx, params) => {
  const { ["@vanguard-manager-session"]: storedCookies } = parseCookies(ctx);

  if (params?.mustBeUnlogged) {
    const hasPermission = !storedCookies;

    return {
      hasPermission,
      ...(hasPermission && { redirect: "/" }),
    };
  }

  if (!params?.roles?.length) {
    const hasPermission = Boolean(storedCookies);

    return {
      hasPermission,
      ...(hasPermission && { redirect: routes.authentication.login }),
    };
  }

  const { role } = JSON.parse(storedCookies);
  const hasPermission = params.roles.includes(role);

  return {
    hasPermission,
    ...(hasPermission && { redirect: "" }),
  };
};
