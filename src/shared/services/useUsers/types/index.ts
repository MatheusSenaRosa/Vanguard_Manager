type ListCustomersReturn = {
  customers: {
    email: string;
    id: string;
    name: string;
    status: string;
  }[];
  lastPage: number;
  page: number;
};

type ListSupervisorsReturn = {
  managers: {
    id: string;
    name: string;
    email: string;
  }[];
  lastPage: number;
  page: number;
};

type ListCreatorsReturn = {
  managers: {
    id: string;
    name: string;
    email: string;
  }[];
  lastPage: number;
  page: number;
};

export type ListCustomers = (params: {
  status?: string;
  search?: string;
}) => Promise<ListCustomersReturn>;

export type ListSupervisors = (params: {
  search?: string;
}) => Promise<ListSupervisorsReturn>;

export type ListCreators = (params: {
  search?: string;
}) => Promise<ListCreatorsReturn>;

export type CountUsers = () => Promise<{
  students: number;
  supervisors: number;
  creators: number;
}>;

export interface IUseUserServices {
  listCustomers: ListCustomers;
  countUsers: CountUsers;
  listSupervisors: ListSupervisors;
  listCreators: ListCreators;
}
