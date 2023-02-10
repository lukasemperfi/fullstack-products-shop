import { FC, ReactNode } from "react";

import { Loader, LoaderSize } from "../../loader/loader";
import classes from "./list-footer.module.scss";

interface ListFooterProps {
  isLoading: boolean;
  isListEnd: boolean;
  LoadingComponent?: ReactNode;
  ListEndComponent?: ReactNode;
}

export const ListFooter: FC<ListFooterProps> = ({
  isLoading,
  isListEnd,
  LoadingComponent,
  ListEndComponent,
}) => {
  return (
    <div className={classes.footerList}>
      {isLoading && (LoadingComponent || <Loader size={LoaderSize.small} />)}

      {isListEnd && (ListEndComponent || <div>No more data</div>)}
    </div>
  );
};
