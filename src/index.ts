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

    // create a photo one
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;
    await connection.manager.save(photo);

    // create a photo
    let photo1 = new Photo();
    photo1.name = "Me and my dog";
    photo1.description = "I am with my dog";
    photo1.filename = "photo-with-perry.jpg";
    photo1.views = 1;
    photo1.isPublished = true;
    await connection.manager.save(photo1);

    const user = new User();
    user.firstName = "Elias";
    user.lastName = "Moura";
    user.age = 28;
    user.isActive = true;
    user.photos = [photo, photo1];
    await connection.manager.save(user);
    // const userRepository = connection.getRepository(User);
    // await userRepository.save(user);

// With cascades enabled you can save this relation with only one save call.
// To load a user with photos inside you must specify the relation in FindOptions:

// const userRepository = connection.getRepository(User);
// const users = await userRepository.find({ relations: ["photos"] });

// or from inverse side

// const photoRepository = connection.getRepository(Photo);
// const photos = await photoRepository.find({ relations: ["user"] });
}).catch(error => console.log(error));