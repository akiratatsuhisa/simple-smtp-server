import { SMTPServer } from "smtp-server";
import fs from "fs";
import path from "path";

const PORT = 25;

const server = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    const fileName = `email_data_${new Date().toISOString()}.txt`.replace(
      /:/g,
      "-"
    );

    const writeStream = fs.createWriteStream(
      path.join(__dirname, "..", "storage", fileName),
      {
        flags: "a",
      }
    );

    stream.pipe(writeStream);
    stream.on("error", callback);
    stream.on("end", callback);
  },
});

server.listen(PORT, () => {
  console.log(`SMTP server is running on port ${PORT}`);
});
