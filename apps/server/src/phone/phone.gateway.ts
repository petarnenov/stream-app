import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { PhoneService } from './phone.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import {Server} from 'ws';

@WebSocketGateway(3001, {
    transports: ['websocket'],
    cors: {origin: '*'} 
  })
export class PhoneGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly phoneService: PhoneService) {}

  @SubscribeMessage('createPhone')
  async create(@MessageBody() createPhoneDto: CreatePhoneDto) {
    console.log('hit the createPhone');
    this.phoneService.create(createPhoneDto, this.server);
  }

  @SubscribeMessage('findAllPhones')
  findAll() {
    console.log('hit the findAllPhones');
    return this.phoneService.findAll();
  }

  @SubscribeMessage('findOnePhone')
  findOne(@MessageBody() id: string) {
    return this.phoneService.findOne(id);
  }

  @SubscribeMessage('updatePhone')
  update(@MessageBody() updatePhoneDto: UpdatePhoneDto) {
    return this.phoneService.update(updatePhoneDto.id, updatePhoneDto);
  }

  @SubscribeMessage('removePhone')
  async remove(@MessageBody() id: string) {
    console.log('hit the removePhone',id);
    this.phoneService.remove(id,this.server);
  }
}
