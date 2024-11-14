import { MagnifyingGlass, Plus, X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";

import { Button, Input } from "@atoms";
import { useQueryState } from "@hooks";
import { useUsersServices } from "@services";

import { TableFilter } from "./components";
import * as S from "./styles";
import { Creators, Students, Supervisors } from "./tabs";
import { Form } from "./types";

export const UsersTemplate = () => {
  const { query, setQuery } = useQueryState();
  const { countUsers } = useUsersServices();

  const { data: count } = useQuery("users_count", countUsers, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { register, handleSubmit, setValue } = useForm<Form>({
    defaultValues: {
      search: query?.search || "",
    },
  });

  const activeTab = query?.tab || "Alunos";

  const tabs = [
    {
      value: "Alunos",
      title: count?.students ? `Alunos | ${count?.students}` : "Alunos",
      content: <Students />,
    },
    {
      value: "Supervisores",
      title: count?.supervisors
        ? `Supervisores | ${count?.supervisors}`
        : "Supervisores",
      content: <Supervisors />,
    },
    {
      value: "Criadores de conteúdo",
      title: count?.creators
        ? `Criadores de conteúdo | ${count?.creators}`
        : "Criadores de conteúdo",
      content: <Creators />,
    },
  ];

  const filters = [
    {
      name: "Status",
      options: [
        {
          name: "Ativo",
          value: "Ativo",
        },
        {
          name: "Inativo",
          value: "Inativo",
        },
      ],
    },
    {
      name: "Assinatura",
      options: [
        {
          name: "Ativa",
          value: "Ativa",
        },
        {
          name: "Inativa",
          value: "Inativa",
        },
      ],
    },
  ];

  const onClearSearch = () => {
    setQuery({ search: "", page: 0 });
    setValue("search", "");
  };

  const onChangeTab = async (tab: string) => {
    setQuery({ tab }, { resetQueries: true });
    setValue("search", "");
  };

  const onSubmitSearch = ({ search }: Form) => {
    setQuery({ search, page: 0 });
  };

  return (
    <>
      <S.SearchForm
        onSubmit={handleSubmit(onSubmitSearch)}
        $isActive={Boolean(query?.search)}
      >
        <div>
          <Input
            placeholder="Pesquisar por nome, ID ou e-mail"
            {...register("search")}
          />

          {query?.search && (
            <button type="button" onClick={onClearSearch} title="Limpar">
              <X />
            </button>
          )}
        </div>

        <Button $buttonTheme="neutral" type="submit" title="Pesquisar">
          <MagnifyingGlass />
        </Button>
      </S.SearchForm>

      <S.FilterWrapper>
        {activeTab === "Alunos" && <TableFilter filters={filters} />}
      </S.FilterWrapper>

      <section>
        <S.TabsList>
          {tabs.map((item) => (
            <li key={item.value}>
              <S.Tab
                $isActive={item.value === activeTab}
                onClick={() => onChangeTab(item.value)}
              >
                {item.title}
              </S.Tab>
            </li>
          ))}

          <Button>
            Criar novo
            <Plus />
          </Button>
        </S.TabsList>

        {tabs.find((item) => item.value === activeTab)?.content}
      </section>
    </>
  );
};
