import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Photo } from "./Photo";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    isActive: boolean;

    @OneToMany(() => Photo, photo => photo.user)
    photos: Photo[];
}