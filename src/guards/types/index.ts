import { GetServerSidePropsContext } from "next";

type Roles = Array<"Administrador" | "Supervisor" | "Criador de conteúdo">;

type Params = {
  mustBeUnlogged?: boolean;
  roles?: Roles;
};

type Return = {
  hasPermission: boolean;
  redirect?: string;
};

export type ValidateRoutePermission = (ctx: GetServerSidePropsContext, params: Params) => Return;
