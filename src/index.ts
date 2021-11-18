/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import { OpenPage } from './containers/Puppeteer';

const PORT = process.env.PORT || 5000;
const app = express();

let namesResolve: any;
let pricesResolve: any;
let idResolve: any;

const GetData = async () => {
  const Resolve = await OpenPage();
  console.log('呼び出し');
  [namesResolve, pricesResolve, idResolve] = [
    Resolve?.[0],
    Resolve?.[1],
    Resolve?.[2],
  ];
};

void GetData();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify(namesResolve));
});

app.get('/pckoubou/prices', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify(pricesResolve));
});

app.get('/pckoubou/id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(JSON.stringify(idResolve));
});

app.listen(PORT, () => {
  console.log('Server running on port %d', PORT);
});
