import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ImagesAndURLs } from "components/upload-images/upload-images";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  createProduct,
  selectProductsState,
} from "store/products-slice/products-slice";
import {
  getAttributesAndValues,
  getList,
} from "store/categories-slice/categories-slice";
import { Info } from "../add-new-product-info-form/add-new-product-info-form";
import {
  selectAttributesAndValues,
  selectList,
} from "store/categories-slice/selectors";
import { ProductDto } from "api/dtos/products/product.dto";
import { ProductForm } from "../product-form/product-form";

interface AddNewProductFormProps {
  product?: ProductDto;
}

export const AddNewProductForm: FC<AddNewProductFormProps> = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading, error, status } = useAppSelector(selectProductsState);
  const categories = useAppSelector(selectList);
  const attributesAndValues = useAppSelector(selectAttributesAndValues);

  const [info, setInfo] = useState<Info>({
    name: "",
    price: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    dispatch(getList());
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getAttributesAndValues({ category_id: selectedCategory }));
    }
  }, [selectedCategory]);

  const handleInfoChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const name = event.target.name;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setImages([...images, ...event.target.files]);
    }
  };

  const deleteImg = (imagesAndUrls: ImagesAndURLs) => {
    const newImages = images.filter(
      (image) => image.name !== imagesAndUrls?.file?.name
    );
    setImages(newImages);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const handleAttributesChange = (event: SelectChangeEvent) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    const infoData = { ...info, price: parseFloat(info.price) };

    formData.append("info", JSON.stringify(infoData));
    formData.append("attributes", JSON.stringify(selectedAttributes));
    formData.append("category", String(selectedCategory));
    formData.append("event", "productImages");

    images.forEach((file: File) => {
      formData.append(file.name, file);
    });

    dispatch(createProduct(formData)).then((response: any) => {
      if (response?.payload.status === 201) {
        navigate(-1);
      }
    });
  };

  return (
    <ProductForm
      infoForm={{
        info: info,
        onChange: handleInfoChange,
        error: error?.response?.data.details,
      }}
      uploadImages={{
        imageFiles: images,
        onChange: onImageChange,
        deleteImage: deleteImg,
      }}
      select={{
        items: categories,
        selectedItem: selectedCategory,
        handleChange: handleCategoryChange,
        label: "Category",
      }}
      attributesForm={{
        attributes: attributesAndValues,
        onChange: handleAttributesChange,
        selectedItem: selectedAttributes,
      }}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};
