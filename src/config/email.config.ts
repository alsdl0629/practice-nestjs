import {registerAs} from "@nestjs/config";
import * as process from "process";

export default registerAs('email', () => ({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pwd: process.env.EMAIL_PWD,
    },
    baseUrl: process.env.EMAIL_BASE_URL,
}));