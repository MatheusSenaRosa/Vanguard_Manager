import { GetServerSideProps } from "next";
import { FiUsers } from "react-icons/fi";

import { SEO } from "@atoms";
import { validateRoutePermission } from "@guards";
import { Layout } from "@organisms";
import { UsersTemplate } from "@templates";

const Users = () => {
  return (
    <>
      <SEO title="Usuários" />
      <Layout
        page={{
          title: "Usuários",
          Icon: () => <FiUsers />,
        }}
      >
        <UsersTemplate />
      </Layout>
    </>
  );
};

export default Users;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const guardResult = await validateRoutePermission(ctx, { roles: ["Administrador"] });

  if (!guardResult.hasPermission)
    return {
      props: {},
      redirect: guardResult.redirect,
    };

  return {
    props: {},
  };
};
