import { ComponentPropsWithoutRef, FC, useState } from "react";
import cn from "classnames";

import styles from "./adaptiv-image.module.scss";

interface AdaptivImageProps extends ComponentPropsWithoutRef<"img"> {
  imgContainerClassname?: string;
  imgClassname?: string;
}

export const AdaptivImage: FC<AdaptivImageProps> = ({
  imgContainerClassname,
  imgClassname,
  ...imgAtr
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div
      className={cn(
        styles.imageContainer,
        {
          [styles.skeleton]: !isImageLoaded,
        },
        imgContainerClassname
      )}
    >
      <img
        className={cn(
          styles.image,
          {
            [styles.loadedImage]: isImageLoaded,
          },
          imgClassname
        )}
        {...imgAtr}
        onLoad={handleOnLoad}
      />
    </div>
  );
};
