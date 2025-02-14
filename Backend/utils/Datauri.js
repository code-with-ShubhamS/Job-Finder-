import DataURIParser from "datauri/parser.js";
import path from "path";
const dataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error("File is missing or invalid.");
  }
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default dataUri;