import { UsersService } from "../services/user.service";
import { UsersController } from "../controllers/user.controller"; 
import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersSchema } from "../schemas/user.schema";

@Module ({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UsersSchema}])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UserModule{}
