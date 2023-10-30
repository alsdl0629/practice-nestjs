import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {AppController} from "./app.controller";
import {ConfigModule} from "@nestjs/config";
import emailConfig from "./config/email.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import loader from "ts-loader";
import {User} from "./users/entities/user.entity";
import {ormConfig} from "../orm.config";
// import {validationSchema} from "./config/validation.schema";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
            load: [emailConfig],
            isGlobal: true,
            // validationSchema
        }),
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: process.env.DB_HOST,
        //     port: 3306,
        //     username: process.env.DB_USERNAME,
        //     password: process.env.DB_PWD,
        //     database: process.env.DB_NAME,
        //     entities: [__dirname + '/**/.entity{.ts,.js'],
        //     synchronize: process.env.DB_SYNCHRONIZE === 'true',
        // })
        TypeOrmModule.forRoot(ormConfig)
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
