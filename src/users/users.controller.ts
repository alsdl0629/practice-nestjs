import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {VerifyEmailDto} from "./dto/verify-email.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserInfo} from "./user-info";
import {UsersService} from "./users.service";
import {ValidationPipe} from "../validation.pipe";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body(ValidationPipe) dto: CreateUserDto): Promise<void> {
        const { name, email, password} = dto;
        await this.usersService.createUser(name, email, password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { authToken } = dto
        return await this.usersService.verifyEmail(authToken);
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const { email, password} = dto;
        return await this.usersService.login(email, password);
    }

    @Get('/:id')
    async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
        return await this.usersService.getUserInfo(userId);
    }
}
