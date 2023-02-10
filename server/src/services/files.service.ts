class FilesService {
  public generateImagesPath = (files: Express.Multer.File[]): string[] => {
    const imagesPath = files?.map(
      (file) => `${process.env.API_URL}/${file.path}`
    );
    return imagesPath;
  };
}
export const filesService = new FilesService();
