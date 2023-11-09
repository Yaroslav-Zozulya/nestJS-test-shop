import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcryprjs from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      throw new HttpException('Email in use', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcryprjs.hash(userDto.password, 5);

    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(newUser);
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Email or password wrong',
      });
    }

    const passwordEquals = await bcryprjs.compare(
      userDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new UnauthorizedException({ message: 'Email or password wrong' });
    }

    return user;
  }
}
