import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/app/config/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(serial: string, userId: string) {
    // Verifique se já existe um dispositivo com o mesmo serial e userId
    const existingDevice = await this.prisma.device.findFirst({
      where: {
        serial,
        userId,
      },
    });

    if (existingDevice) {
      // Verifique a diferença de datas
      const dateFromDB = new Date(existingDevice.createdAt);
      const dateNow = new Date();
      const differenceInMilliseconds = dateNow.getTime() - dateFromDB.getTime();
      const millisecondsInADay = 24 * 60 * 60 * 1000; // Milissegundos em um dia
      const differenceInDays = differenceInMilliseconds / millisecondsInADay;

      if (differenceInDays < 30) {
        throw new BadRequestException({
          message: `Já existe um dispositivo registrado com o mesmo serial e userId, criado em ${dateFromDB}, e não se passaram 30 dias desde a criação.`,
        });
      }
    }
    const device = await this.prisma.device.create({
      data: {
        serial,
        userId,
      },
    });

    return device;
  }
}
