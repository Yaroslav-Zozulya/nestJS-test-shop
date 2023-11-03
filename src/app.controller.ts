import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/users')
  getUser() {
    return this.appService.getUsers();
  }
}
