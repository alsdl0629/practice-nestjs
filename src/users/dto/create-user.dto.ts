import {IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {Transform} from "class-transformer";
import {BadRequestException} from "@nestjs/common";

export class CreateUserDto {
    @Transform(({ value, obj}) => {
        if (obj.password.includes(obj.name.trim())) {
            throw new BadRequestException('password는 name과 같은 문자열을 포함할 수 없습니다.');
        }
        return value.trim();
    })
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @IsEmail()
    @MaxLength(60)
    readonly email: string;

    @IsString()
    @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
    readonly password: string;
}
