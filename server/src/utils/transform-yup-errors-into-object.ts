import { ValidationError } from "yup";

export const transformYupErrorsIntoObject = (errorObject: ValidationError) => {
  const validationErrors: Record<string, string> = {};

  errorObject.inner.forEach((errorObj: ValidationError) => {
    if (errorObj.path !== undefined) {
      const pathArray = errorObj.path.split(".");

      const validationField = pathArray[pathArray.length - 1];
      validationErrors[validationField] = errorObj.errors[0];
    }
  });

  return validationErrors;
};
