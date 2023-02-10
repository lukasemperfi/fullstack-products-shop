import cn from "classnames";
import { FC, MouseEvent, useState } from "react";
import { FunctionComponent } from "react";

import { IconButton } from "components/icon-button/icon-button";
import classes from "./dropdown-select.module.scss";
import { ReactComponent as SortIcon } from "assets/sort.svg";
import { ReactComponent as ArrowUpIcon } from "assets/arrow.svg";

export type Option = {
  id: number;
  name: string;
  value: string | number;
  icon?: FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

interface DropdownSelectProps {
  defaultValue: string | number | null;
  label?: string;
  onChange: (event: MouseEvent<HTMLElement>, value: Option["value"]) => void;
  options: Option[];
}

export const DropdownSelect: FC<DropdownSelectProps> = ({
  onChange,
  options,
  defaultValue,
  label,
}) => {
  const [isActive, setIsActive] = useState(false);
  const defaultOption = options.find((option) => option.value === defaultValue);

  const switchIsActive = () => {
    setIsActive((prev) => !prev);
  };

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    value: Option["value"]
  ) => {
    onChange(event, value);
    setIsActive(false);
  };

  return (
    <div className={cn(classes["dropdown"])}>
      <IconButton
        className={cn(classes["dropdown__btn"])}
        onClick={switchIsActive}
      >
        <SortIcon className={classes["dropdown__sort-icon"]} />
        {defaultOption ? defaultOption.name : label}
        {defaultOption?.icon ? (
          <defaultOption.icon className={cn(classes["dropdown__arrow-icon"])} />
        ) : (
          <ArrowUpIcon className={cn(classes["dropdown__arrow-icon"])} />
        )}
      </IconButton>
      <ul
        className={cn(classes["dropdown__content"], {
          [classes["active"]]: isActive,
        })}
      >
        {options.map((option) => (
          <li
            key={option.id}
            className={cn(classes["dropdown__item"], {
              [classes["active"]]: option.value === defaultValue,
            })}
            onClick={(event) => handleChange(event, option.value)}
          >
            {option.name}
            {option?.icon && (
              <option.icon className={cn(classes["dropdown__arrow-icon"])} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
