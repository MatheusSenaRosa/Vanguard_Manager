import styled, { css } from "styled-components";

export const Container = styled.div``;

export const Avatar = styled.div`
  ${({ theme }) => css`
    height: 80px;
    width: 80px;

    border: 2px solid ${theme.colors.primary.yellow};
    background-color: ${theme.colors.neutral[20]};
    border-radius: 50%;
  `}
`;

export const Status = styled.div<{ type: "success" | "error" }>`
  ${({ theme, type }) => css`
    font-size: 16px;

    color: ${theme.colors.feedback[type]};
  `}
`;
