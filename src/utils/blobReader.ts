export const getTextFromBlob = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("loadend", () => {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
      } else {
        reject(new Error("parse error"));
      }
    });

    fileReader.addEventListener("error", (e) => {
      reject(e);
    });

    fileReader.readAsText(blob);
  });
};
