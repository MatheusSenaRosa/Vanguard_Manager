import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import { SEO } from "@atoms";
import { LoginTemplate } from "@templates";

const Login = () => {
  return (
    <>
      <SEO title="Entrar" />
      <LoginTemplate />
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["@vanguard-manager-session"]: storedCookies } = parseCookies(ctx);

  if (storedCookies) {
    return {
      props: {},
      redirect: { destination: "/usuarios" },
    };
  }

  return {
    props: {},
  };
};

