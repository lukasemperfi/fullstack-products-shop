import * as React from "react";
import PaginationMui from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface PaginationProps {
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  count: number;
}

export const Pagination: FC<PaginationProps> = ({ page, onChange, count }) => {
  return (
    <Stack spacing={2}>
      <PaginationMui
        count={count}
        size="large"
        page={page}
        onChange={onChange}
      />
    </Stack>
  );
};
