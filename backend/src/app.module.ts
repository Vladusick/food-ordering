import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesModule } from './dishes/dishes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'taldavi',
      database: 'food_ordering',

      autoLoadEntities: true,
      synchronize: true,
    }),

    DishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
