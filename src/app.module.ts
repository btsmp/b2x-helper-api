import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DeviceService } from './modules/device/device.service';
import { DeviceController } from './modules/device/device.controller';
import { DeviceModule } from './modules/device/device.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';
import { PrismaService } from './app/config/prisma.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';

@Module({
  imports: [UserModule, DeviceModule, AuthModule],
  controllers: [
    AppController,
    DeviceController,
    UserController,
    AuthController,
  ],
  providers: [
    AppService,
    DeviceService,
    UserService,
    AuthService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
