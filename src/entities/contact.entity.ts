import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';

import {Mail} from "./mail.entity";

@Entity()
export class Contact extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString({ message: 'Le sujet de votre demande de contact doit être une chaine de caractères.' })
    @IsNotEmpty({ message: 'La demande de contact doit posséder un sujet.' })
    sujet: string;

    @Column()
    @IsString({ message: 'Le message de votre demande de contact doit être une chaine de caractères.' })
    @IsNotEmpty({ message: 'La demande de contact doit posséder un message de contenu.' })
    details: string;

    @ManyToOne(() => Mail, m => m.demandesContact)
    mail: Mail;

    constructor(sujet: string, details: string, mail: Mail) {
        super();

        this.sujet = sujet;
        this.details = details;
        this.mail = mail;
    }

}
