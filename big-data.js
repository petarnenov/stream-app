function createLargeFile() {
  const fs = require('fs');
  const filePath = 'big-data.txt';
  const fileSize = 1024 * 1024 * 512; // 1GB in bytes
  const writeStream = fs.createWriteStream(filePath);

  const chunkSize = 1024 * 1024; // 1MB chunk size
  const chunk = Buffer.alloc(chunkSize, 'a');

  let bytesWritten = 0;

  function writeChunk() {
    let shouldContinue = true;
    while (shouldContinue && bytesWritten < fileSize) {
      shouldContinue = writeStream.write(chunk);
      bytesWritten += chunkSize;
    }
    if (bytesWritten < fileSize) {
      writeStream.once('drain', writeChunk);
    } else {
      writeStream.end();
      console.log('File created successfully');
    }
  }

  writeChunk();
}

createLargeFile();