import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

export type SelectItem = {
  id: string | number;
  name: string;
};

interface SelectProps {
  items: any[];
  selectedItem?: string;
  handleChange?: (event: SelectChangeEvent) => void;
  label: string;
  attrId?: string;
  defaultValue?: string;
}

export const Select: FC<SelectProps> = ({
  items,
  selectedItem,
  handleChange,
  label,
  attrId,
  defaultValue,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <MuiSelect
          value={selectedItem}
          name={attrId}
          label={label}
          onChange={handleChange}
        >
          {items.length ? (
            items.map((item) => (
              <MenuItem value={String(item.id)} key={item.id}>
                {item.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value={defaultValue}></MenuItem>
          )}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};
