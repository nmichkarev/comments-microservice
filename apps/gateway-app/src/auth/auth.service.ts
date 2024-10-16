import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(login);
    //TODO: implement password encryption
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.name, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
