export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
}

interface IApiResponse extends IUser {
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUseSession {
  user: IUser | null | undefined;
  isLoggingOut: boolean;
  createSession: (session: IApiResponse) => void;
  restoreSession: () => void;
  destroySession: () => Promise<void>;
}
