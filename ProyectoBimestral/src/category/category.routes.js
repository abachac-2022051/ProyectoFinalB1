'use strict'

import  Express  from "express"
import { actulizarCategoria, agregarCategoria, eliminarCategoria, listarCategoria } from "./category.controller.js"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"


const api = Express.Router()



api.get('/listarCategoria', [validateJwt], listarCategoria)
api.post('/agregarCategorias',[validateJwt, isAdmin],agregarCategoria)
api.put('/actualizarCategoria/:id',[validateJwt, isAdmin], actulizarCategoria)
api.delete('/eliminarCategoria/:id',[validateJwt, isAdmin], eliminarCategoria)

export default api