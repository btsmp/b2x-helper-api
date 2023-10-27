import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/config/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO): Promise<User> {
    const { email, password, name, role } = data;

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  }
}
