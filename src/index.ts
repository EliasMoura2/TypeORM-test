import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Photo} from "./entity/Photo";
import { PhotoMetadata } from "./entity/PhotoMetaData";
// require('dotenv').config
import 'dotenv/config';

createConnection({
    type: "mysql",
    host: `${process.env.HOST}`,
    port: 3306,
    username: `${process.env.USER_DB}`,
    password: `${process.env.PASS_DB}`,
    database: `${process.env.DB_NAME}`,
    entities: [
        User,
        Photo,
        PhotoMetadata
    ],
    // entities:[
        // __dirname + "/entity/*.ts"
    // ],
    synchronize: true,
    logging: false
}).then(async connection => {
    // here you can start to work with your entities

    // console.log("Here you can setup and run express/koa/any other framework.");

    // create a photo
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;

    // create a photo metadata
    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.orientation = "portrait";
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.photo = photo; // this way we connect them

    // get entity repositories
    let photoRepository = connection.getRepository(Photo);
    let metadataRepository = connection.getRepository(PhotoMetadata);

    // first we should save a photo
    await photoRepository.save(photo);

    // photo is saved. Now we need to save a photo metadata
    await metadataRepository.save(metadata);

    // done
    console.log("Metadata is saved, and relation between metadata and photo is created in the database too");

}).catch(error => console.log(error));