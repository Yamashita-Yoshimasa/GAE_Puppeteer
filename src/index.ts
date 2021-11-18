/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const OpenPage = async () => {
  let pckoubouNames: unknown = [];
  let pckoubouPrices: unknown = [];
  let pckoubouId: unknown = [];
  dotenv.config();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(process.env.PC_KOUBOU_URL || '', {
    // ページを読み込むまで待機
    waitUntil: 'networkidle2',
    timeout: 0,
  });
  pckoubouNames = await page.$$eval('.name', (item) =>
    item.map((names) => names.textContent),
  );
  pckoubouPrices = await page.$$eval('.price--num', (item) =>
    item.map((prices) => prices.textContent),
  );
  pckoubouId = await page.$$eval('.item-code > dd', (item) =>
    item.map((id) => id.textContent),
  );

  await browser.close();
  // unknown型ガードl
  if (
    typeof pckoubouNames === 'object' &&
    pckoubouNames != null &&
    typeof pckoubouPrices === 'object' &&
    pckoubouPrices != null &&
    typeof pckoubouId === 'object' &&
    pckoubouId != null
  ) {
    return Promise.resolve([pckoubouNames, pckoubouPrices, pckoubouId]);
  }
};


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
