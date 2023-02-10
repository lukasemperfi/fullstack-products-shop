import { ChangeEvent, FC, useEffect, useState } from "react";
import cn from "classnames";

import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import unknownUserIcon from "assets/unknown-user.png";
import classes from "./upload-avatar-image.module.scss";

export type ImageAndURL = {
  file: File;
  url: string;
};

interface UploadAvatarImageProps {
  image: File | null;
  avatar?: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadAvatarImage: FC<UploadAvatarImageProps> = ({
  image,
  onChange,
  avatar,
}) => {
  const [imageAndURL, setImageAndURL] = useState<ImageAndURL>();
  const avatarViewImage = imageAndURL
    ? imageAndURL?.url
    : avatar || unknownUserIcon;

  const generateImageAndURL = () => {
    if (image) {
      const newImageURL = {
        file: image,
        url: URL.createObjectURL(image),
      };

      setImageAndURL(newImageURL);
    }
  };


  useEffect(() => {
    generateImageAndURL();
  }, [image]);

  return (
    <div className={classes["upload-image"]}>
      <div className={cn(classes["upload-image__avatar"], classes["avatar"])}>
        <AdaptivImage
          src={avatarViewImage}
          alt="user-avatar"
          imgContainerClassname={classes["avatar__img-container"]}
          imgClassname={classes["avatar__img"]}
        />
      </div>
      <div className={classes["upload-image__input"]}>
        <label className={classes["upload-image__label"]}>
          Change Foto
          <input
            type="file"
            className={classes["upload-image__hidden"]}
            accept="image/*"
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
};
