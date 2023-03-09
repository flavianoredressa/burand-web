export function readFileAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (): void => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (): void => {
      reject();
    };
    fileReader.readAsDataURL(file);
  });
}
