import styled from "styled-components";
import { css } from "styled-components";

export const SearchForm = styled.form<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    display: flex;
    align-items: center;

    color: ${theme.colors.neutral[0]};

    margin-bottom: 20px;
    border-radius: 5px;

    div {
      display: flex;
      align-items: center;
      position: relative;

      input {
        width: 310px;

        border-top-right-radius: 0;
        border-bottom-right-radius: 0;

        ${$isActive &&
        css`
          padding-right: 30px;
        `}

        outline: none;
        border-right: 1px solid ${theme.colors.neutral[100]};
      }

      button {
        position: absolute;
        right: 0;

        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        padding-right: 10px;

        font-size: 16px;

        cursor: pointer;
        color: ${theme.colors.neutral[0]};
      }
    }

    > button {
      height: 40px;
      width: 40px;

      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      ${$isActive &&
      css`
        background-color: ${theme.colors.feedback.success};

        svg {
          color: ${theme.colors.neutral[80]};
        }
      `}
    }
  `}
`;

export const FilterWrapper = styled.div`
  min-height: 49px;

  margin-bottom: 20px;
`;

export const TabsList = styled.ul`
  ${({ theme }) => css`
    display: flex;
    gap: 10px;

    > button {
      margin-left: auto;

      display: flex;
      align-items: center;
      gap: 20px;

      color: ${theme.colors.neutral[0]};
      font-weight: 600;

      height: 45px;

      padding: 0 30px;

      svg {
        color: ${theme.colors.neutral[0]};
      }
    }
  `}
`;

export const Tab = styled.button<{ $isActive?: boolean }>`
  ${({ theme, $isActive }) => css`
    display: flex;
    align-items: center;

    padding: 0 30px;

    height: 50px;

    border-radius: 10px 10px 0 0;
    border: none;

    background-color: ${$isActive
      ? theme.colors.neutral[40]
      : theme.colors.neutral[70]};

    color: ${theme.colors.neutral[0]};
    font-weight: 600;
    font-size: 15px;

    cursor: pointer;
    transition: 0.3s;
  `}
`;
