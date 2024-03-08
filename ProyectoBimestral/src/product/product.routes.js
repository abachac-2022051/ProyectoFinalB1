'use strict'

import Express from 'express'
import { agregarP, deleteP, listNP, listP, listPA, listPC, updateP } from './product.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = Express.Router()

api.post('/agregar', [validateJwt, isAdmin],agregarP)
api.put('/actualizar/:id', [validateJwt, isAdmin],updateP)
api.delete('/eliminar/:id', [validateJwt, isAdmin],deleteP)
api.get('/agotado', [validateJwt, isAdmin], listPA)


api.post('/listarN', [validateJwt], listNP)
api.get('/listarC/:id',[validateJwt], listPC)

api.get('/listar', [validateJwt], listP)

export default api