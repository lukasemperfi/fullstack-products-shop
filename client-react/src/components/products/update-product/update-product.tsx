import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ImagesAndURLs } from "components/upload-images/upload-images";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  selectProductsState,
  updateProduct,
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

interface UpdateProductProps {
  product?: ProductDto;
}

export const UpdateProduct: FC<UpdateProductProps> = ({ product }) => {
  const {
    name,
    price,
    description,
    category,
    attributes,
    images: productImages,
  } = product || {};

  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, status } = useAppSelector(selectProductsState);
  const categories = useAppSelector(selectList);
  const attributesAndValues = useAppSelector(selectAttributesAndValues);

  const defaultInfo = {
    name: name || "",
    price: price ? String(price) : undefined || "",
    description: description || "",
  };
  const [productDefaultImages, setProductDefaultImages] = useState(
    productImages?.map((imagePath) => imagePath.path) || []
  );
  const defaultCategory =
    (category?.length && String(category[0].category_id)) || "";
  const defaultAttributes =
    attributes?.reduce((obj: { [key: string]: any } = {}, attribute) => {
      obj[attribute.id] = attribute.value_id;

      return obj;
    }, {}) || {};

  const [info, setInfo] = useState<Info>(defaultInfo);
  const [images, setImages] = useState<File[]>([]);
  const [imagesForDelete, setImagesForDelete] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(defaultCategory);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>(defaultAttributes);


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
    if (imagesAndUrls.file === null) {
      setImagesForDelete([...imagesForDelete, imagesAndUrls.url]);
    }

    const newproductDefaultImages = productDefaultImages.filter((path) => {
      if (imagesAndUrls.file === null) {
        return path !== imagesAndUrls.url;
      }
    });
    const newImages = images.filter((image) => {
      if (imagesAndUrls.file) {

        return image.name !== imagesAndUrls.file.name;
      }
    });
    setImages(newImages);
    setProductDefaultImages(newproductDefaultImages);
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
    formData.append("imagesForDelete", JSON.stringify(imagesForDelete));
    formData.append("event", "productImages");

    images.forEach((file: File) => {
      formData.append(file.name, file);
    });

    dispatch(updateProduct({ data: formData, productId })).then(
      (response: any) => {
        if (response?.payload.status === 201) {
          navigate(-1);
        }
      }
    );
  };

  return (
    <>
      {product && (
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
            imagesPath: productDefaultImages,
          }}
          select={{
            items: categories,
            selectedItem: selectedCategory,
            handleChange: handleCategoryChange,
            label: "Category",
            defaultValue: defaultCategory,
          }}
          attributesForm={{
            attributes: attributesAndValues,
            onChange: handleAttributesChange,
            selectedItem: selectedAttributes,
          }}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </>
  );
};
