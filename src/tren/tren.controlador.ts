import {Request, Response, NextFunction} from "express";
import { Tren } from "./tren.entidad.js";
import { orm } from "../shared/db/orm.js";

const em = orm.em

function sanitizarTrenInput(req: Request, res: Response, next: NextFunction) {
  
  req.body.sanitizarInput = {
    color: req.body.color,
    modelo: req.body.modelo
  }

  Object.keys(req.body.sanitizarInput).forEach(key => {
    if (req.body.sanitizarInput[key] === undefined) {
      delete req.body.sanitizarInput[key]
    }
  })
  next();
};

async function findAll(req: Request, res: Response) {
  try{
    const trenes = await em.find(Tren, {});
    res.status(200).json({message: 'Todos los trenes', data:trenes});
  } catch (error:any) {
    res.status(500).json({message: 'Error al obtener los trenes', error: error.message});
}};

async function getOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tren = await em.findOneOrFail(Tren, {id});
    res.status(200).json({message: 'Tren encontrado', data: tren});
  } catch (error:any) {
    res.status(500).json({message: 'Error al obtener el tren', error: error.message});
  }
  
};

async function add(req: Request, res:Response){
  try {
    const tren = em.create(Tren, req.body.sanitizarInput);
    await em.flush();
    res.status(201).json({message: 'Tren agregado', data: tren});
    //await em.persistAndFlush(tren);
  } catch (error:any) {
    return res.status(500).json({message: 'Error al agregar el tren', error: error.message});
  }
};

async function update(req: Request, res:Response){
  try {
    const id = Number.parseInt(req.params.id);
    const tren = await em.findOneOrFail(Tren, {id});
    em.assign(tren, req.body.sanitizarInput);
    await em.flush();
    res.status(200).json({message: 'Tren actualizado', data: tren});
  } catch (error:any) {
    res.status(500).json({message: 'Error al actualizar el tren', error: error.message});
  }
};



async function remove(req: Request, res:Response){
  try {
    const id = Number.parseInt(req.params.id);
    const tren = await em.findOneOrFail(Tren, {id});
    await em.removeAndFlush(tren);
    res.status(200).json({message: 'Tren eliminado', data: tren});
  } catch (error:any) {
    res.status(500).json({message: 'Error al eliminar el tren', error: error.message});
  }
};



export { sanitizarTrenInput, findAll, getOne, add, update, remove };