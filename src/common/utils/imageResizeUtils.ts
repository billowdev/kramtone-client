import Resizer from 'react-image-file-resizer';

interface ResizedImage {
  file: File;
  name: string;
  type: string;
}

export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<ResizedImage> => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      'JPEG',
      100,
      0,
      (resizedImage: string | Blob | File | ProgressEvent<FileReader>) => {
        if (typeof resizedImage !== 'string' && resizedImage instanceof Blob) {
          const extension = file.name.split('.').pop();
          const newFile = new File([resizedImage], file.name, {
            type: `image/${extension}`,
          });
          const resizedData: ResizedImage = {
            file: newFile,
            name: file.name,
            type: file.type,
          };
          resolve(resizedData);
        } else {
          reject(new Error('Error resizing image'));
        }
      },
      'blob'
    );
  });
};
