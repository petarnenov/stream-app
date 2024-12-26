import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackService {
  webClient = new WebClient(this.configService.get('SLACK_OAUTH_TOKEN'));

  constructor(private readonly configService: ConfigService) {}

  sendMessage(text: string) {
    return this.webClient.chat.postMessage({
      channel: this.configService.get('SLACK_CONVERSATION_ID'),
      text,
    });
  }
}
