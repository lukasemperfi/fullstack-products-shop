import { Request, Response, NextFunction } from "express-serve-static-core";

export const jsonParseBody = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { info, attributes, category, imagesForDelete } = req.body;
  const files = req.files;

  const imgForDelete = imagesForDelete && {
    imagesForDelete: JSON.parse(imagesForDelete),
  };

  req.body = {
    info: JSON.parse(info),
    attributes: JSON.parse(attributes),
    category: parseInt(category, 10),
    images: files,
    ...imgForDelete,
  };

  next();
};
