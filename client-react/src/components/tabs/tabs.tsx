import cn from "classnames";
import React, { FC, useRef, useState } from "react";

import { useIsOverflow } from "hooks/use-is-overflow";
import classes from "./tabs.module.scss";

export interface Tab {
  id: string | number;
  label?: string | number;
  children: any;
}

export interface TabsProps {
  className?: string;
  defaultActiveId: string | number;
  items: Tab[];
  onClick?: (id: string | number) => void;
}

export const Tabs: FC<TabsProps> = ({ items, defaultActiveId, onClick }) => {
  const [activeTabId, setactiveTabId] = useState(defaultActiveId);
  const refTabPanel = useRef(null);

  const isTabPanelOverflow = useIsOverflow(refTabPanel);

  const handleTabsClick = (id: string | number) => {
    setactiveTabId(id);
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className={cn(classes["tabs"])}>
      <div
        className={cn(classes["tabs_panel"], classes["panel"], {
          [classes["active"]]: isTabPanelOverflow,
        })}
        ref={refTabPanel}
      >
        {items.map((tab) => (
          <div
            className={cn(classes["panel__tab"], {
              [classes["active"]]: tab.id === activeTabId,
            })}
            key={tab.id}
            onClick={() => handleTabsClick(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className={cn(classes["tabs_content"], classes["content"])}>
        {items.map((tab) => {
          if (tab.id !== activeTabId) {
            return undefined;
          }
          return <React.Fragment key={tab.id}>{tab.children}</React.Fragment>;
        })}
      </div>
    </div>
  );
};
