type Messages = { [key: string]: string };

export const ptbr = {
  errors: {
    authentication: {
      signIn: (error: string) => {
        const messages: Messages = {
          "Email or password is invalid": "Email ou senha inválido.",
        };

        return messages[error];
      },

      forgotPassword: (error: string) => {
        const messages: Messages = {
          "User not found": "Este usuário não existe.",
        };

        return messages[error];
      },

      resetPassword: (error: string) => {
        const messages: Messages = {
          "Token is invalid or expired": "Token inválido ou expirado.",
        };

        return messages[error];
      },
    },
  },
};
