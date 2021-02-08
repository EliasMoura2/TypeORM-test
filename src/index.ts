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
    
    console.log("Inserting a new user into the database..."); 
    
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    user.isActive = true;
    const userRepository = connection.getRepository(User);
    await userRepository.save(user);
    // await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    

    console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // const allUsers = await repository.find();
    const users = await userRepository.find();
    console.log("Loaded users: ", users);
}).catch(error => console.log(error));