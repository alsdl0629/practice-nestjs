import {Controller, Get} from "@nestjs/common";
import * as process from "process";
import {ConfigService} from "@nestjs/config";

@Controller()
export class AppController {
    constructor(
        private readonly configService: ConfigService
    ) {}


    @Get('/db-host-from-config')
    getDataBaseHostFronConfigService(): string {
        return this.configService.get('DB_HOST');
    }
}