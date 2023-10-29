import {Inject, Injectable} from '@nestjs/common';
import Mail from "nodemailer/lib/mailer";
import * as nodemailer from 'nodemailer';
import emailConfig from "../config/email.config";
import {ConfigType} from "@nestjs/config";

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;

    constructor(
        @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
    ) {
        this.transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.auth.user,
                pass: config.auth.pwd,
            }
        });
    }

    async sendMemberJoinVerification(emailAddress: string, authToken: string) {
        const baseUrl = this.config.baseUrl;

        const url = `${baseUrl}/users/email-verify?authToken=${authToken}`;

        const mailOptions: EmailOptions = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html: `
                가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
                <form action="${url}" method="post">
                    <button>가입확인</button>
                </form>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }
}
