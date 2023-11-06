import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://chelariu2mihai:Proiect_TPI_ChelariuMihai_434A@cluster0.23debwd.mongodb.net/') ,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
