// import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm";
// import {Photo} from "./Photo";

// @Entity()
// export class Author {
// // Author contains an inverse side of a relation. OneToMany is always an inverse side of relation, and it can't exist without ManyToOne on the other side of the relation.
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @OneToMany(type => Photo, photo => photo.author) 
//     // note: we will create author property in the Photo class below
//     photos: Photo[];
// }