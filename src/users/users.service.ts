import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { UpdateRoleDto } from './dto/update-role.dot';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleRepository: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.getUserByEmail(dto.email);
    if (user) {
      throw new HttpException('Email in use', HttpStatus.CONFLICT);
    }

    const newUser = await this.userRepository.create(dto);
    const role = await this.roleRepository.getRoleByValue('USER');
    await newUser.$set('roles', [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async updateRole(dto: UpdateRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleRepository.getRoleByValue(dto.value);

    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    console.log(dto);

    console.log(dto.banReason);
    user.banReason = dto.banReason;
    user.save();
    return user;
  }
}
