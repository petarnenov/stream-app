import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './entities/phone.entity';
import { Repository } from 'typeorm';
import { Server } from 'ws';

import { faker } from '@faker-js/faker';

@Injectable()
export class PhoneService {
  seed: NodeJS.Timeout;
  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
  ) {}
  async create(createPhoneDto: CreatePhoneDto, server: Server) {
    const phone = await this.phoneRepository.save(createPhoneDto);
    this.broadcast('createPhone', phone, server);
    //this.seedWith100_000(server);
  }

  async seedWith100_000(server: Server) {
    if (this.seed) {
      clearInterval(this.seed);
      this.seed = null;
    }
    this.seed = setInterval(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const phones: CreatePhoneDto[] = Array.from({ length: 1 }, (_, i) => ({
        brand: faker.company.name(),
        model: faker.commerce.productName(),
        price: faker.commerce.price(),
      }));

      const createdPhones = [];
      for (const phone of phones) {
        createdPhones.concat(this.phoneRepository.save(phone));
      }

      await Promise.all(createdPhones);
      const allPhones = await this.phoneRepository.find();
      this.broadcast('findAllPhones', allPhones, server);
    }, 1000);
  }

  async findAll() {
    const payload = await this.phoneRepository.find();
    const event = 'findAllPhones';
    return { event, payload };
  }

  findOne(id: string) {
    return this.phoneRepository.findOneBy({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePhoneDto: UpdatePhoneDto) {
    return `This action updates a #${id} phone`;
  }

  async remove(id: string, server: Server) {
    await this.phoneRepository.delete(id);
    this.broadcast('removePhone', { id }, server);
  }

  broadcast(event: string, payload: any, server: Server) {
    server.clients.forEach((c) => {
      if (c.readyState === c.OPEN) {
        c.send(JSON.stringify({ event, payload }));
      }
    });
  }
}
