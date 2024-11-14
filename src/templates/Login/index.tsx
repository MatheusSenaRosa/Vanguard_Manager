import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormErrorMessage, Input, Label, Spinner } from "@atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthenticationServices } from "@services";
import { useSession } from "@store";
import { formatEmail, ptbr, routes } from "@utils";

import * as S from "./styles";
import { IForm } from "./types";
import { schema } from "./utils";

export const LoginTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { signIn } = useAuthenticationServices();
  const { createSession } = useSession();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email: dirtyEmail, password }: IForm) => {
    if (isLoading) return;

    setIsLoading(true);

    const email = formatEmail(dirtyEmail);

    try {
      const response = await signIn({ email, password });
      createSession(response);
      toast.success("Login efetuado com sucesso!");

      await router.replace(routes.users.list);
    } catch (err) {
      setIsLoading(false);

      const errorMessage = ptbr.errors.authentication.signIn(err as string);
      if (!errorMessage) {
        toast.error("Ocorreu um erro ao tentar entrar.");
        return;
      }
      toast.warn(errorMessage);
    }
  };

  return (
    <S.Container>
      <S.Content>
        <h2>Entrar</h2>

        <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <S.FormRow>
            <S.InputContainer $isError={Boolean(errors.email?.message)}>
              <Label htmlFor="email">
                Email*
                <Input id="email" placeholder="Insira o email" {...register("email")} disabled={isLoading} />
              </Label>
              {errors.email?.message && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
            </S.InputContainer>
          </S.FormRow>

          <S.FormRow>
            <S.InputContainer $isError={Boolean(errors.password?.message)}>
              <Label htmlFor="password">
                Senha*
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      disabled={isLoading}
                      type={"password"}
                      id="password"
                      placeholder="Insira a senha"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
              </Label>

              {errors.password?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
            </S.InputContainer>
          </S.FormRow>

          <S.Submit type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}

            {!isLoading && "Entrar"}
          </S.Submit>

          <S.ForgotPassword href={routes.authentication.forgotPassword}>Esqueceu a senha?</S.ForgotPassword>
        </S.Form>
      </S.Content>
    </S.Container>
  );
};
