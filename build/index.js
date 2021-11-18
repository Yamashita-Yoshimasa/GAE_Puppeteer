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
import express from "express";
import { OpenPage } from "./containers/Puppeteer";
const PORT = process.env.PORT || 5e3;
const app = express();
let namesResolve;
let pricesResolve;
let idResolve;
const GetData = () => __async(void 0, null, function* () {
  const Resolve = yield OpenPage();
  console.log("\u547C\u3073\u51FA\u3057");
  [namesResolve, pricesResolve, idResolve] = [
    Resolve == null ? void 0 : Resolve[0],
    Resolve == null ? void 0 : Resolve[1],
    Resolve == null ? void 0 : Resolve[2]
  ];
});
void GetData();
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({ id: 1234 });
});
app.get("/pckoubou/prices", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(JSON.stringify(pricesResolve));
});
app.get("/pckoubou/id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(JSON.stringify(idResolve));
});
app.listen(PORT, () => {
  console.log("Server running on port %d", PORT);
});
