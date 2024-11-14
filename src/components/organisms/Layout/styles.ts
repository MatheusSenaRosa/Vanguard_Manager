import NextLink from "next/link";
import styled, { css } from "styled-components";

import { Skeleton as AtomSkeleton } from "@atoms";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;

  position: relative;

  overflow: hidden;
`;

export const Aside = styled.aside`
  ${({ theme }) => css`
    position: absolute;
    left: 0;
    z-index: 1;

    height: 100vh;
    width: 230px;
    max-width: 230px;
    min-width: 230px;
    padding: 20px 0;

    background-color: ${theme.colors.neutral[60]};

    display: flex;
    flex-direction: column;
    gap: 40px;

    h1 {
      color: ${theme.colors.neutral[0]};
      font-size: 24px;
      font-weight: normal;
      text-align: center;
      user-select: none;
    }
  `}
`;

export const Skeleton = styled(AtomSkeleton)`
  position: absolute;
  left: 0;
  z-index: 1;

  height: 100vh;
  width: 230px;
  max-width: 230px;
  min-width: 230px;
`;

export const Profile = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    h2 {
      color: ${theme.colors.neutral[0]};
      font-size: 20px;
    }
  `}
`;

export const EmptyAvatar = styled.div`
  ${({ theme }) => css`
    width: 120px;
    height: 120px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid ${theme.colors.primary.yellow};
    border-radius: 50%;

    overflow: hidden;

    svg {
      width: 100%;
      height: 100%;

      color: ${theme.colors.primary.yellow};
    }
  `}
`;

export const Nav = styled.nav`
  margin-top: -10px;
  padding: 0 5px;
`;

export const Link = styled(NextLink)<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    font-size: 18px;
    color: ${$isActive ? theme.colors.primary.blue : theme.colors.neutral[0]};

    border-radius: 25px;

    display: flex;
    gap: 10px;

    padding: 15px;

    svg {
      font-size: 24px;
    }

    &:hover {
      background-color: ${theme.colors.neutral[40]};
      transition: 0.3s;
    }
  `}
`;

export const SignoutButton = styled.button`
  ${({ theme }) => css`
    margin: auto auto 0 auto;

    border: none;
    width: fit-content;
    background-color: transparent;
    border-radius: 20px;
    padding: 5px 15px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    transition: 0.3s;

    font-size: 18px;
    color: ${theme.colors.feedback.error};

    svg {
      font-size: 24px;
    }

    &:hover {
      color: ${theme.colors.neutral[100]};
      background-color: ${theme.colors.feedback.error};
    }
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    width: 100%;

    overflow: auto;

    margin-left: 230px;

    padding: 20px 40px;

    > h1 {
      display: flex;
      align-items: center;
      gap: 20px;

      font-size: 30px;
      font-weight: bold;
      color: ${theme.colors.neutral[0]};

      margin-bottom: 20px;
    }
  `}
`;
