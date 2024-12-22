import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { Readable } from 'stream';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accRepository: Repository<Account>,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    return this.accRepository.save(createAccountDto);
  }

  async findAll(res: Response) {
    const count = await this.accRepository.count();
    const chunkSize = Math.ceil(count / 1000);
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    console.log('count', count, chunkSize);
    const numberOfChinks = Math.ceil(count / chunkSize);

    for (let i = 0; i < 50; i++) {
      const chunk = await this.accRepository.find({
        select: {
          id: true,
          owner: true,
          balance: true,
          currency: true,
        },
        skip: i * chunkSize,
        take: chunkSize,
      });
      const chunkJson = JSON.stringify(chunk);
      res.write(chunkJson);
      
    }
    res.end();
  }

  findOne(id: string) {
    return this.accRepository.findOneBy({ id });
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.accRepository.update(id, updateAccountDto);
  }

  remove(id: string) {
    return this.accRepository.delete(id);
  }
}
