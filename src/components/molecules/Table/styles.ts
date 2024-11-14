import { lighten, rgba } from "polished";
import { css } from "styled-components";
import { styled } from "styled-components";

import { Button } from "@atoms";
import { skeleton } from "@styles/animations";

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 0 10px 10px 10px;

    background-color: ${theme.colors.neutral[40]};

    h3 {
      text-align: center;
      padding: 50px;

      color: ${theme.colors.neutral[0]};
    }
  `}
`;

export const Table = styled.table`
  ${({ theme }) => css`
    width: 100%;
    border-collapse: collapse;

    color: ${theme.colors.neutral[0]};
    font-size: 16px;
  `}
`;

export const HeadRow = styled.tr`
  ${({ theme }) => css`
    position: sticky;
    top: -20px;

    height: 50px;

    background-color: ${theme.colors.neutral[40]};

    box-shadow: 0px 0px 10px 1px ${rgba(theme.colors.neutral[100], 0.5)};

    width: 100%;
  `}
`;

export const HeadData = styled.th<{
  $minWidth?: number;
  $width?: number;
  $maxWidth?: number;
}>`
  ${({ $minWidth, $width, $maxWidth }) => css`
    min-width: ${$minWidth ? `${$minWidth}px` : "none"};
    max-width: ${$maxWidth ? `${$maxWidth}px` : "none"};
    width: ${$width ? `${$width}px` : "max-content"};

    &:first-child,
    &:last-child {
      padding: 0 22px;
    }
  `}
`;

export const BodyRow = styled.tr`
  ${({ theme }) => css`
    height: 100px;
    cursor: pointer;

    transition: 0.3s;

    &:hover {
      background-color: ${lighten(0.04, theme.colors.neutral[40])};

      td {
        color: ${theme.colors.primary.blue};
      }
    }
  `}
`;

export const RowSkeleton = styled.tr`
  ${({ theme }) => css`
    height: 100px;

    animation: ${skeleton} 1s infinite ease;
    background-color: ${theme.colors.neutral[60]};
  `}
`;

export const BodyData = styled.td`
  &:last-child,
  &:first-child {
    padding: 0 22px;
  }
`;

export const PaginationWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    gap: 10px;

    padding: 11px 22px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 40px;
      width: 40px;

      background-color: ${lighten(0.06, theme.colors.neutral[40])};

      &:disabled,
      &:disabled {
        background-color: ${lighten(0.06, theme.colors.neutral[40])};
        opacity: 0.5;
      }
    }
  `}
`;

export const PaginationButton = styled(Button)`
  ${({ theme }) => css`
    &:disabled {
      color: ${theme.colors.neutral[80]} !important;
      background-color: ${theme.colors.feedback.success} !important;
      opacity: 1 !important;
    }
  `}
`;
