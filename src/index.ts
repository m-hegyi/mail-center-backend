import 'reflect-metadata';
import express from 'express';
import * as env from 'dotenv';

import v1Router from './router/v1.router';
import { createConnection } from 'typeorm';

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', v1Router);

app.listen(3000, async () => {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT ?? '', 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [`${__dirname}/entity/*.entity.ts`],
    synchronize: true,
  });
  // const response = await getRepository(UserPermission).find();
  // console.log(response);
  // // console.log(connection);
});

export default app;
