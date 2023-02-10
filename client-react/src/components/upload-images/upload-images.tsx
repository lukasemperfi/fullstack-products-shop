import { Button } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";
import classes from "./upload-images.module.scss";

export type ImagesAndURLs = {
  file: File | null;
  url: string;
};

interface UploadImagesProps {
  imageFiles: File[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteImage: (imageAndUrl: ImagesAndURLs) => void;
  imagesPath?: string[];
}

export const UploadImages: FC<UploadImagesProps> = ({
  imageFiles,
  onChange,
  deleteImage,
  imagesPath,
}) => {
  const [imagesAndURLs, setImagesAndURLs] = useState<ImagesAndURLs[]>([]);

  const generateImagesAndURLs = (files: File[], imagePath?: string[]) => {
    const newImagesURLs = files.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));

    const paths =
      imagePath?.map((path) => ({
        file: null,
        url: path,
      })) || [];

    setImagesAndURLs([...newImagesURLs, ...paths]);
  };

  useEffect(() => {
    generateImagesAndURLs(imageFiles, imagesPath);
  }, [imageFiles]);

  return (
    <div className={classes["upload-images"]}>
      <div className={classes["upload-images__inputs"]}>
        <div className={classes["upload-images__label-title"]}>Images</div>
        <label className={classes["upload-images__label"]}>
          Choose Images
          <input
            type="file"
            className={classes["upload-images__hidden"]}
            multiple
            accept="image/*"
            onChange={onChange}
          />
        </label>
      </div>
      <div className={(classes["upload-images__images"], classes["images"])}>
        {imagesAndURLs.map((imageAndUrl, index) => (
          <div className={classes["images__item"]} key={imageAndUrl.url}>
            {index === 0 ? "Main" : undefined}
            <AdaptivImage
              src={imageAndUrl.url}
              imgContainerClassname={classes["images__image"]}
            />
            <div className={classes["images__bottom"]}>
              <Button
                variant="outlined"
                className={classes["images__del-button"]}
                onClick={() => deleteImage(imageAndUrl)}
              >
                Del
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
