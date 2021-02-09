import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from "typeorm";
import { PhotoMetadata } from "./PhotoMetaData";
// import {Author} from "./Author";
import { User } from "./User"
@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string; 

    @Column("text")
    description: string;

    @Column()
    filename: string;

    @Column("double")
    views: number;

    @Column()
    isPublished: boolean;

    // @OneToOne(type => PhotoMetadata, photoMetaData => photoMetaData.photo)
    // metadata: PhotoMetadata;

    // We can setup cascade options in our relations, in the cases when we want our related object to be saved whenever the other object is saved. 
    @OneToOne(type => PhotoMetadata, metadata => metadata.photo, {
        cascade: true,
    })
    metadata: PhotoMetadata;

    // In many-to-one / one-to-many relation, the owner side is always many-to-one. It means that the class that uses @ManyToOne will store the id of the related object.
    // @ManyToOne(type => Author, author => author.photos)
    // author: Author;

    @ManyToOne(() => User, user => user.photos)
    user: User;
}