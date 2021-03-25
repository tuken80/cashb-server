import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsDate, IsNotEmpty, IsString} from 'class-validator';
import {Mail} from "./mail.entity";

@Entity()
export class Actualite extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString({message: "Le titre de l'actualité doit être une chaine de caractères."})
    @IsNotEmpty({ message: "Le titre de l'actualité doit être renseigné." })
    titre: string;

    @Column()
    @IsDate({message: "La date de l'actualité doit être au format date."})
    @IsNotEmpty({ message: "La date de l'actualité doit être renseignée." })
    date: Date;

    @Column()
    @IsString({message: "La description de l'actualité doit être une chaine de caractères."})
    @IsNotEmpty({ message: "La description de l'actualité doit être renseignée." })
    description: string;

    @Column()
    @IsString({message: "Le contenu de l'actualité doit être une chaine de caractères."})
    @IsNotEmpty({ message: "Le contenu de l'actualité doit être renseigné." })
    contenu: string;


    constructor(titre: string, description: string, contenu: string, date: Date) {
        super();

        this.titre = titre;
        this.description = description;
        this.contenu = contenu;
        this.date = date;
    }

}
