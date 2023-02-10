import { Button, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, FormEvent } from "react";

import { CreateAttributeDto } from "api/dtos/products/attribute/create-attribute.dto";
import { ErrorDetails } from "api/dtos/response/error-response.dto";
import {
  ImagesAndURLs,
  UploadImages,
} from "components/upload-images/upload-images";
import { AttributesForm } from "../add-new-product-form/attributes-form/AddNewAttributesForm/attributes-form";
import { Select } from "../add-new-product-form/select/select";
import {
  AddNewProductInfoForm,
  Info,
} from "../add-new-product-info-form/add-new-product-info-form";
import classes from "./product-form.module.scss";

interface ProductFormProps {
  infoForm: {
    info: Info;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    error: ErrorDetails | undefined;
  };
  uploadImages: {
    imageFiles: File[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    deleteImage: (imageAndUrl: ImagesAndURLs) => void;
    imagesPath?: string[];
  };
  select: {
    items: any[];
    selectedItem?: string;
    handleChange?: (event: SelectChangeEvent<string>) => void;
    label: string;
    defaultValue?: string;
  };
  attributesForm: {
    attributes: CreateAttributeDto[];
    onChange: (event: SelectChangeEvent<string>) => void;
    selectedItem: {
      [key: string]: any;
    };
  };
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const ProductForm: FC<ProductFormProps> = ({
  infoForm,
  uploadImages,
  select,
  attributesForm,
  onSubmit,
  isLoading,
}) => {
  return (
    <>
      <form className={classes["form"]} onSubmit={onSubmit}>
        <AddNewProductInfoForm
          info={infoForm.info}
          onChange={infoForm.onChange}
          error={infoForm.error}
        />
        <UploadImages
          imageFiles={uploadImages.imageFiles}
          onChange={uploadImages.onChange}
          deleteImage={uploadImages.deleteImage}
          imagesPath={uploadImages.imagesPath}
        />
        <Select
          items={select.items}
          selectedItem={select.selectedItem}
          handleChange={select.handleChange}
          label={select.label}
          defaultValue={select?.defaultValue || ""}
        />
        <AttributesForm
          attributes={attributesForm.attributes}
          onChange={attributesForm.onChange}
          selectedItem={attributesForm.selectedItem}
        />
        <Button variant="contained" className={classes["button"]} type="submit">
          Save
        </Button>
      </form>
    </>
  );
};
