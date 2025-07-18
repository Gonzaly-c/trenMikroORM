import "reflect-metadata";
import express from "express";
import { trenRuta } from "./tren/tren.ruta.js";
import { orm, syncSchema } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/core";

const app = express();
app.use(express.json());

//
app.use((req, res, next) => {
  RequestContext.create(orm.em, next)  
});
//

app.use('/api/trenes', trenRuta)

app.use((_, res) => {
  return res.status(404).send({ message: "Ruta no encontrada" });
}  
)

await syncSchema() //nunca en produccion

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});