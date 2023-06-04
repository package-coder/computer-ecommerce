import express, { Express } from "express";
import { dataSource } from "./data-source"
import { server_config } from "../config/env";
import cookieParser from "cookie-parser";
import corsOption from "../config/corsOption";
import cors from 'cors';
import routers from "./routers";
import { connect } from "mongoose";

dataSource.initialize().then(async () => {

    const app: Express = express();
    app.use('/public', express.static('public'));

    app.use(cors(corsOption))
    app.use(cookieParser())
    app.use(express.json())
    app.use(routers)


    const { 
        connection: { host, port, name }
    } = await connect(server_config.DB_URI)

    console.log(`ServerDB is running at ${host}:${port}/${name}`)

    app.listen(server_config.SERVER_PORT, () => 
        console.log(`Server is running at ${server_config.SERVER_URI}:${server_config.SERVER_PORT}`)
    );
}).catch(error => console.log(error))
