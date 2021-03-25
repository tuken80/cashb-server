import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany} from "typeorm";
import {
    IsDate,
    IsInt,
    IsString,
    IsEmail,
    IsNotEmpty,
    IsAlpha, IsBoolean
} from 'class-validator';

import {User} from "./user.entity";
import {Contact} from "./contact.entity";

@Entity()
export class Mail extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail({}, { message: "L'adresse mail doit posséder un format correct." })
    @IsNotEmpty({ message: "L'utilisateur doit posséder une adresse mail." })
    value: string;

    @Column()
    @IsBoolean()
    enableNewsletter: boolean;

    @OneToOne(() => User, u => u.mail)
    @JoinColumn()
    user: User;

    @OneToMany(() => Contact, dc => dc.mail)
    demandesContact: Contact[];

    constructor(value: string, enableNewsletter: boolean) {
        super();

        this.value = value;
        this.enableNewsletter = enableNewsletter;
    }


}
