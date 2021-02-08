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
    // metadata.photo = photo; // this way we connect them
    photo.metadata = metadata;

    // get repository
    let photoRepository = connection.getRepository(Photo);

    // saving a photo also save the metadata
    // guarda la foto y tambien el metadata al estar en cascada
    await photoRepository.save(photo);

    console.log("Photo is saved, photo metadata is saved too.")

    // busca las fotos que tengan relacion con metadata
    let photos = await photoRepository.find({ relations: ["metadata"] });
    console.log(photos)
}).catch(error => console.log(error));