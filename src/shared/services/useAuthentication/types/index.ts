type SignInBody = {
  email: string;
  password: string;
};

type SignInResponse = {
  id: string;
  email: string;
  role: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type SignIn = (body: SignInBody) => Promise<SignInResponse>;

type RefreshTokenResponse = {
  id: string;
  email: string;
  role: string;
  name: string;
  accessToken: string;
  refreshToken: string;
};

type RefreshToken = (refreshToken: string) => Promise<RefreshTokenResponse>;

type ForgotPassword = (email: string) => Promise<void>;

type ResetPasswordBody = {
  email: string;
  newPassword: string;
  token: string;
};

type ResetPassword = (body: ResetPasswordBody) => Promise<void>;

type WhoAmIResponse = {
  id: string;
  name: string;
  gitHub: string;
  linkedIn: string;
  role: string;
  email: string;
  createdAt: Date;
};

type WhoAmI = (ignoreCatch?: boolean) => Promise<WhoAmIResponse>;

export interface IUseAuthentication {
  signIn: SignIn;
  refreshToken: RefreshToken;
  forgotPassword: ForgotPassword;
  resetPassword: ResetPassword;
  whoAmI: WhoAmI;
}
