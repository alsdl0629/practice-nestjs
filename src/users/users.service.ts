import * as uuid from 'uuid';
import {Injectable} from '@nestjs/common';
import {EmailService} from "../email/email.service";
import {UserInfo} from "./user-info";

@Injectable()
export class UsersService {
    constructor(private emailService: EmailService) {
    }

    async createUser(name: string, email: string, password: string) {
        await this.checkUserExists(email);

        const authToken = uuid.v1();

        await this.saveUser(name, email, password, authToken);
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

    private checkUserExists(email: string) {
        return false;
    }

    private saveUser(name: string, email: string, password: string, authToken: string) {
        return;
    }

    private async sendMemberJoinEmail(email: string, authToken) {
        await this.emailService.sendMemberJoinVerification(email, authToken);
    }
}
