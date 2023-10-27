import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RolesGuard } from 'src/core/guards/role.guard';
import { CreateDeviceDTO } from './dto/create-device.dto';
import { User } from 'src/core/decorators/user.decorator';
import { User as TypeUser } from 'src/app/common/user.interface';
import { DeviceService } from './device.service';

@Controller('device')
@UseGuards(AuthGuard, RolesGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  @Post()
  create(@Body() { serial }: CreateDeviceDTO, @User() user: TypeUser) {
    return this.deviceService.create(serial.toUpperCase(), user.id);
  }
}
