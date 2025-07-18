import {Router} from "express"
import { sanitizarTrenInput, findAll, getOne, add, update, remove } from "./tren.controlador.js";


export const trenRuta = Router()

trenRuta.get("/", findAll);
trenRuta.get("/:id", getOne)
trenRuta.post("/", sanitizarTrenInput, add)
trenRuta.put("/:id", sanitizarTrenInput, update)
trenRuta.patch("/:id", sanitizarTrenInput, update)
trenRuta.delete("/:id", remove)
