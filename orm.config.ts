import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "qaz",
    database: "practice_nestjs",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}