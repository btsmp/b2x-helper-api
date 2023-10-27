import { Body, Controller, Post, Get } from '@nestjs/common';
import { LoginDTO } from './dto/Login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() user: LoginDTO) {
    return this.authService.login(user.email, user.password);
  }

  @Get('check')
  checkToken() {}
}
