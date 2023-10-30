import * as uuid from 'uuid';
import {Injectable, InternalServerErrorException, UnprocessableEntityException} from '@nestjs/common';
import {EmailService} from "../email/email.service";
import {UserInfo} from "./user-info";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {DataSource, Repository} from "typeorm";
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
    constructor(
        private emailService: EmailService,
        @InjectRepository(User) private userRepository: Repository<User>,
        private dataSource: DataSource
    ) {}

    async createUser(name: string, email: string, password: string) {
        const userExist = await this.checkUserExists(email);
        if (userExist) {
            throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
        }

        const authToken = uuid.v1();

        // await this.saveUser(name, email, password, authToken);
        // await this.saveUserUsingQueryRunner(name, email, password, authToken);
        await this.saveUserUsingTransaction(name, email, password, authToken);
        await this.sendMemberJoinEmail(email, authToken);
    }

    async verifyEmail(email: string): Promise<string> {
        throw new Error('Method not implemented');
    }

    async login(email: string, password: string): Promise<string> {
        throw new Error('Method not implemented');
    }

    async getUserInfo(userId: string): Promise<UserInfo> {
        throw new Error('Method not implemented');
    }

    private async checkUserExists(email: string) {
        const user = await this.userRepository.findOne({
            where: { email: email }
        });
        return user !== null;
    }

    private async saveUser(name: string, email: string, password: string, authToken: string) {
        const user = new User();
        user.id = ulid();
        user.name = name;
        user.email = email;
        user.password = password;
        user.authCode = authToken;
        await this.userRepository.save(user);
    }

    private async saveUserUsingQueryRunner(name: string, email: string, password: string, authToken: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = new User();
            user.id = ulid();
            user.name = name;
            user.email = email;
            user.password = password;
            user.authCode = authToken;
            await queryRunner.manager.save(user);
            throw new InternalServerErrorException();
            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async saveUserUsingTransaction(name: string, email: string, password: string, authToken: string) {
        await this.dataSource.transaction(async manager => {
            const user = new User();
            user.id = ulid();
            user.name = name;
            user.email = email;
            user.password = password;
            user.authCode = authToken;

            await manager.save(user);

            throw new InternalServerErrorException();
        });
    }

    private async sendMemberJoinEmail(email: string, authToken) {
        await this.emailService.sendMemberJoinVerification(email, authToken);
    }
}
