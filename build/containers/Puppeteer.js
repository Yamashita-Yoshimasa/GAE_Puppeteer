var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import puppeteer from "puppeteer";
import dotenv from "dotenv";
const OpenPage = () => __async(void 0, null, function* () {
  let pckoubouNames = [];
  let pckoubouPrices = [];
  let pckoubouId = [];
  dotenv.config();
  const browser = yield puppeteer.launch({
    headless: true
  });
  const page = yield browser.newPage();
  yield page.goto(process.env.PC_KOUBOU_URL || "", {
    waitUntil: "networkidle2",
    timeout: 0
  });
  pckoubouNames = yield page.$$eval(".name", (item) => item.map((names) => names.textContent));
  pckoubouPrices = yield page.$$eval(".price--num", (item) => item.map((prices) => prices.textContent));
  pckoubouId = yield page.$$eval(".item-code > dd", (item) => item.map((id) => id.textContent));
  yield browser.close();
  if (typeof pckoubouNames === "object" && pckoubouNames != null && typeof pckoubouPrices === "object" && pckoubouPrices != null && typeof pckoubouId === "object" && pckoubouId != null) {
    return Promise.resolve([pckoubouNames, pckoubouPrices, pckoubouId]);
  }
});
export {
  OpenPage
};
