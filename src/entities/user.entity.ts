import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne} from "typeorm";
import {
    IsDate,
    IsInt,
    IsString,
    IsAlpha
} from 'class-validator';

import {Mail} from "./mail.entity";

@Entity()
@Unique("INDIVIDU", ["prenom", "nom", "dateNaissance"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsAlpha('fr-FR', { message: "Le prénom de l'utilisateur ne peut contenir que des lettres." })
    prenom: string;

    @Column()
    @IsAlpha('fr-FR', { message: "Le nom de l'utilisateur ne peut contenir que des lettres." })
    nom: string;

    @Column()
    @IsDate({ message: "La date de naissance de l'utilisateur doit être au format date." })
    dateNaissance: Date;

    @Column()
    @IsString({ message: "L'adresse de l'utilisateur doit être une chaine de caractères." })
    adresse: string;

    @Column()
    @IsInt({ message: "Le code postal de l'utilisateur doit être un entier numérique." })
    codePostal: string;

    @Column()
    @IsAlpha('fr-FR', {message: "La ville de l'utilisateur ne peut contenir que des lettres."})
    ville: string;

    @OneToOne(() => Mail, m => m.user) // specify inverse side as a second parameter
    mail: Mail;

}
