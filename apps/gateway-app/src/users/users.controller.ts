import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiSecurity('jwt')
  @UseGuards(AuthGuard)
  @Get('userinfo')
  async getInfo(@Request() req) {
    return req.user;
  }

  // Left unprotected for testing
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.saveUser(createUserDto);
  }
}