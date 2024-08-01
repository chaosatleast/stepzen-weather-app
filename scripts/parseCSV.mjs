import fs from "fs";
import path from "path";
import Papa from "papaparse";

const parseCSV = async (filePath) => {
  const csvFile = fs.readFileSync(path.resolve(filePath), "utf8");

  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error.message);
      },
    });
  });
};

export default parseCSV;
