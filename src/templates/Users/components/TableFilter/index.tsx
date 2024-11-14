import { X } from "phosphor-react";
import { useState } from "react";

import { Button } from "@atoms";
import { useQueryState } from "@hooks";
import { Modal } from "@molecules";

import * as S from "./styles";
import { Filter, Modal as ModalType } from "./types";

type Props = {
  filters: Filter[];
};

export const TableFilter = ({ filters }: Props) => {
  const [modal, setModal] = useState<ModalType>(null);

  const { query, setQuery, resetQueries } = useQueryState();

  const hasAnyFilter = filters?.some(
    (item) => query[item.name.toLocaleLowerCase()]
  );

  const onChangeCheckbox = (value: string) => {
    setModal((prev) => {
      const modalData: ModalType = {
        ...prev,
        filterOptions: prev.filterOptions.map((item) => ({ ...item })),
      };

      const foundIndex = modalData.filterOptions.findIndex(
        (item) => item.value === value
      );

      modalData.filterOptions[foundIndex].isChecked =
        !modalData.filterOptions[foundIndex].isChecked;

      return modalData;
    });
  };

  const onClearModal = () => {
    setModal((prev) => ({
      ...prev,
      filterOptions: prev.filterOptions.map((item) => ({
        ...item,
        isChecked: false,
      })),
    }));
  };

  const onOpenModal = (filter: Filter) => {
    const options = [...filter.options];

    const filterOptions = options.map((item) => {
      const filterValues = query[filter.name.toLocaleLowerCase()];

      if (Array.isArray(filterValues)) {
        const isChecked = filterValues?.some(
          (filterItem) => filterItem === item.value
        );

        return {
          ...item,
          isChecked: Boolean(isChecked),
        };
      }

      const isChecked = filterValues === item.value;

      return {
        ...item,
        isChecked: Boolean(isChecked),
      };
    });

    setModal({
      filterName: filter.name,
      filterOptions,
    });
  };

  const onSubmit = () => {
    const queryKey = modal.filterName.toLocaleLowerCase();

    const checkedOptions = modal.filterOptions
      .filter((item) => item?.isChecked)
      .map((item) => item.value);

    setQuery({ [queryKey]: checkedOptions, page: 1 });

    setModal(null);
  };

  return (
    <>
      <S.Container $hasClearButton={hasAnyFilter}>
        Filtros:
        {filters.map((filter) => (
          <S.FilterTag
            key={filter.name}
            $isActive={Boolean(query[filter.name.toLocaleLowerCase()])}
            type="button"
            onClick={() => onOpenModal(filter)}
          >
            {filter.name}
          </S.FilterTag>
        ))}
        {hasAnyFilter && (
          <button title="Limpar" type="button" onClick={resetQueries}>
            Limpar
          </button>
        )}
      </S.Container>

      <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)}>
        <S.ModalWrapper>
          <header>
            Filtro
            <button type="button" onClick={() => setModal(null)}>
              <X />
            </button>
          </header>

          {modal && (
            <S.ModalContent>
              <h3>{modal.filterName}:</h3>

              <ul>
                {modal.filterOptions.map((option) => (
                  <li key={option.value}>
                    <label htmlFor={option.value}>
                      <input
                        type="checkbox"
                        id={option.value}
                        onChange={() => onChangeCheckbox(option.value)}
                        checked={option?.isChecked}
                      />
                      {option.name}
                    </label>
                  </li>
                ))}
              </ul>
            </S.ModalContent>
          )}

          <S.ModalFooter>
            <Button type="button" $buttonTheme="neutral" onClick={onClearModal}>
              Limpar
            </Button>
            <Button
              type="button"
              $buttonTheme="cancel"
              onClick={() => setModal(null)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={onSubmit}>
              Salvar
            </Button>
          </S.ModalFooter>
        </S.ModalWrapper>
      </Modal>
    </>
  );
};
