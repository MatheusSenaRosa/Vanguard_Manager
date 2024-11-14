export type Option = {
  value: string;
  name: string;
  isChecked?: boolean;
};

export type Filter = {
  name: string;
  options: {
    value: string;
    name: string;
  }[];
};

export type Modal = {
  filterName: string;
  filterOptions: Option[];
};
