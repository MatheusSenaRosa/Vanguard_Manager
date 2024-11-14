import { useRouter } from "next/router";
import { ChalkboardTeacher, SignOut, User, UserCircle } from "phosphor-react";
import { FiUsers } from "react-icons/fi";
import { RiPagesLine } from "react-icons/ri";

import { useSession } from "@store";
import { routes } from "@utils";

import * as S from "./styles";

type Props = {
  page: {
    title: string;
    Icon: () => React.ReactNode;
  };
  children: React.ReactNode;
};

export const Layout = ({ page: { title, Icon }, children }: Props) => {
  const { user, destroySession } = useSession();

  const username = user?.name.split(" ")[0];

  const { pathname } = useRouter();

  const currentPathname = `/${pathname.split("/")[1]}`;

  const navigationItems = [
    {
      title: "Usuários",
      href: routes.users.list,
      Icon: () => <FiUsers />,
    },
    {
      title: "Aulas",
      href: "",
      Icon: () => <ChalkboardTeacher />,
    },
    {
      title: "Posts",
      href: "",
      Icon: () => <RiPagesLine />,
    },
    {
      title: "Meu perfil",
      href: "",
      Icon: () => <UserCircle />,
    },
  ];

  if (!user) {
    return (
      <S.Container>
        <S.Skeleton />

        <S.Main>
          <h1>
            <Icon />
            {title}
          </h1>

          {children}
        </S.Main>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Aside>
        <h1>Vanguard</h1>

        <S.Profile>
          <S.EmptyAvatar>
            <User />
          </S.EmptyAvatar>

          <h2>{username}</h2>
        </S.Profile>

        <S.Nav>
          <ul>
            {navigationItems.map(({ title, href, Icon }) => (
              <li key={title}>
                <S.Link href={href} $isActive={currentPathname === href}>
                  <Icon />
                  {title}
                </S.Link>
              </li>
            ))}
          </ul>
        </S.Nav>

        <S.SignoutButton onClick={destroySession}>
          <SignOut size={32} />
          Sair
        </S.SignoutButton>
      </S.Aside>

      <S.Main>
        <h1>
          <Icon />
          {title}
        </h1>
        {children}
      </S.Main>
    </S.Container>
  );
};
