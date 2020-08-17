import express from 'express';
import * as env from 'dotenv';
import { createConnection, getRepository } from 'typeorm';
import { UserPermission } from './entity/user-permission.entity';

env.config();

const app = express();

app.listen(3000, async () => {
  // const connection = await createConnection({
  //   type: 'mysql',
  //   host: process.env.MYSQL_HOST || 'localhost',
  //   port: parseInt(process.env.MYSQL_PORT ?? '', 10) || 3306,
  //   username: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE,
  //   entities: [`${__dirname}/entity/*.entity.ts`],
  //   synchronize: true,
  // });
  // const response = await getRepository(UserPermission).find();
  // console.log(response);
  // // console.log(connection);
  // console.log('hello');
});

export default app;
