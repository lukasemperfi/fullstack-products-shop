export const getPosterImg = (
  url: string,
  posterPath?: string | null,
  thumbImage?: string
) => {
  if (!posterPath) {
    return thumbImage;
  }

  return url + posterPath;
};
