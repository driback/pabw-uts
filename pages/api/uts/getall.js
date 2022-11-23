import path from "path";
import { promises as fs } from "fs";
import { parseString } from "xml2js";
import { parse } from "papaparse";

export default async function handler(req, res) {
  const arr = [];

  const dataDirectory = path.join(process.cwd(), "public/data");

  const jsonContent = await fs.readFile(dataDirectory + "/cars.json", "utf8");
  const objectData = JSON.parse(jsonContent);
  arr.push(objectData);

  const xmlContent = await fs.readFile(dataDirectory + "/cars.xml", "utf8");
  parseString(
    xmlContent,
    { trim: true, explicitArray: false },
    function (err, result) {
      const datas = result?.root?.row;
      return arr.push(datas.slice(1));
    }
  );

  const csvContent = await fs.readFile(dataDirectory + "/cars.csv", "utf8");
  parse(csvContent, {
    skipEmptyLines: true,
    header: true,
    complete: function (results) {
      return arr.push(results?.data);
    },
  });

  res.send({ json: arr[0], xml: arr[1], csv: arr[2] });
}
