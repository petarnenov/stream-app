import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Account)
    private readonly accRepository: Repository<Account>,
  ) {}
  async getSeed() {
    await this.seed();
    return 'Seed data has been generated!';
  }

  async seed() {
    const records = 1_000_000;
    for (let i = 0; i < records; i++) {
      const account = new Account();
      account.owner = 'John Doe';
      account.balance = Math.floor(Math.random() * 10000);
      account.currency = 'USD';
      await this.accRepository.save(account);
    }
  }
}
