import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsString, IsInt, IsPositive, Min, Max, IsNotEmpty} from "class-validator";

@Entity()
export class Musique extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString({message: 'La titre de la musique doit être une chaine de caractères.'})
    @IsNotEmpty({ message: 'Le titre de la musique doit être renseigné.' })
    titre: string;

    @Column()
    @IsInt({message: "L'année de la musique doit un entier numérique."})
    @IsPositive({message: "L'année de la musique doit un entier numérique positif."})
    @Min(1900, {message: "L'année de la musique ne doit pas être inférieur à 1900."})
    @Max(2150, {message: "L'année de la musique ne doit pas être supérieur à 2150."})
    @IsNotEmpty({ message: "L'année de la musique doit être renseignée." })
    annee: number;
}
