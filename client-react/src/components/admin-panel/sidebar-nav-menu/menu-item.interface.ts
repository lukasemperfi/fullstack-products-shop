import { FunctionComponent } from "react";

export interface MenuItem {
  id: number;
  name: string;
  path?: string;
  children: MenuItem[];
  parent_id?: number;
  icon?: FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  level?: number;
}
