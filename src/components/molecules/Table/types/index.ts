export type GenericObject = { [key: string]: any };

export type Column<T extends GenericObject[]> =
  | {
      id?: string;
      header: string;
      accessor?: string;
      width?: number;
      maxWidth?: number;
      minWidth?: number;
      align?: "left" | "center" | "right";
      Cell?: (row: { row: T[number] }) => React.ReactNode;
    }
  | {
      id: string;
      header?: string;
      accessor?: string;
      width?: number;
      maxWidth?: number;
      minWidth?: number;
      align?: "left" | "center" | "right";
      Cell?: (row: { row: T[number] }) => React.ReactNode;
    };

