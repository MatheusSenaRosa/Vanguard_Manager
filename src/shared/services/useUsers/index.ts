import QueryString from "qs";

import { api } from "../config";
import {
  CountUsers,
  IUseUserServices,
  ListCreators,
  ListCustomers,
  ListSupervisors,
} from "./types";

export const useUsersServices = (): IUseUserServices => {
  const listCustomers: ListCustomers = async (params) => {
    try {
      const { data } = await api.get("/customers", {
        params,
        paramsSerializer: (param) =>
          QueryString.stringify(param, { arrayFormat: "repeat" }),
      });
      return data;
    } catch {
      throw new Error();
    }
  };

  const listSupervisors: ListSupervisors = async (params) => {
    try {
      const { data } = await api.get("/managers", {
        params: { ...params, role: "Supervisor" },

        paramsSerializer: (param) =>
          QueryString.stringify(param, { arrayFormat: "repeat" }),
      });
      return data;
    } catch {
      throw new Error();
    }
  };

  const listCreators: ListCreators = async (params) => {
    try {
      const { data } = await api.get("/managers", {
        params: { ...params, role: "Criador de conteúdo" },

        paramsSerializer: (param) =>
          QueryString.stringify(param, { arrayFormat: "repeat" }),
      });
      return data;
    } catch {
      throw new Error();
    }
  };

  const countUsers: CountUsers = async () => {
    const [students, managers] = await Promise.all([
      api.get("/customers/count"),
      api.get("/managers/count"),
    ]);

    return {
      students: students.data.total,
      supervisors: managers.data.totalSupervisors,
      creators: managers.data.totalCreators,
    };
  };

  return {
    listCustomers,
    countUsers,
    listSupervisors,
    listCreators,
  };
};
