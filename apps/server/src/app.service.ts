import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBigData(res: Response) {
    const file = createReadStream(join(process.cwd(), 'big-data.txt'));
    file.pipe(res);
  }
}
