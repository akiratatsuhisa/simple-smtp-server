import { simpleParser } from "mailparser";
import fs from "fs";
import path from "path";
import { argv } from "process";

const filePath = path.join(__dirname, "..", "storage", argv[2]);

const stream = fs.createReadStream(filePath);

(async () => {
  const parsed = await simpleParser(stream);

  console.log(parsed);
})();
