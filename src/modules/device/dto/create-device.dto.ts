import { IsString, Length } from 'class-validator';

export class CreateDeviceDTO {
  @Length(11, 11, { message: 'O serial deve ter exatamente 11 caracteres' })
  @IsString()
  serial: string;
}
