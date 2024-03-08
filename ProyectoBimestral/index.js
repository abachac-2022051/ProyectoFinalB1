import { initServer } from './configs/app.js'
import { connect } from './configs/mongo.js'
import { agregarPorDefecto } from './src/category/category.controller.js'
import { defaultAdmin } from './src/user/user.controller.js'

agregarPorDefecto()
defaultAdmin()

initServer()
connect()