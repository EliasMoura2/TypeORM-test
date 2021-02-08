import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { PhotoMetadata } from "./PhotoMetaData";
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
}