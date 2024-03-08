'use string'

import categoriasModel from "../category/category.model.js"
import productoModel from "./product.model.js"

export const agregarP = async(req,res)=>{
    try {
        let datos = req.body
        let category = await categoriasModel.findOne({_id: datos.categoria} )
        if(!category) return res.status(400).send({message:'No se encontro la categoria'})
        let producto = new productoModel(datos)
        await producto.save()
        return res.send({message: `Se pudo agregar exitosamente el producto`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No se pudo agregar Nuevo Producto'})

    }
}

export const updateP = async(req,res)=>{
    try {
     let {id}= req.params
     let datos = req.body
     let actulizarProducto = await productoModel.findOneAndUpdate(
         {_id: id},
         datos,
         {new: true}
     )
     if(!actulizarProducto) return res.status(401).send({message: 'No se pudo actulizar'})
     return res.send({message: 'Se actulizo el producto', actulizarProducto})        
 } catch (err) {
     console.error(err)
     return res.status(500).send({message: 'Error al actualizar'})
 }
}

export const deleteP = async(req,res)=>{
    try {
        let {id} = req.params
        let eliminarProducto = await productoModel.findOneAndUpdate({_id: id},{estado: false})
        if(eliminarProducto.estado === false) return res.send({message: 'Producto ya eliminado '})
        if(!eliminarProducto) return res.status(404).send({message: 'No se encotro el Producto y no se pudo eliminar' })
        return res.send({message: `Su producto se elimino exitosamente`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al eliminarlo'})
        
    }
}

export const listP =async(req,res)=>{
    try {
        let producto = await productoModel.find({estado: true}).populate('categoria',['name','description'])
        if(producto.length === 0) return res.status(400).send({message: 'No tenemos sistema'})
        return res.send({producto})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No hay productos'})
        
    }
}

export const listNP = async(req,res)=>{
    try {
        let {nombre} = req.body
        let producto = await productoModel.findOne({nombre: nombre},{estado: true}).populate('categoria',['category','descripcion'])
        if(!producto)return res.status(404).send({message: 'Ningun producto tiene este nombre'})
        return res.send({message:'Producto encontrado',producto})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al listar por nombre'})
    }
}

export const listPC = async(req,res)=>{
    try {
        let {id} = req.params
        let producto = await productoModel.findOne({categoria: id},{estado: true}).populate('categoria',['category','description'])
        if(!producto)return res.status(404).send({message: 'Ningun producto tiene este nombre'})
        return res.send({message:'Producto encontrado',producto})
     } catch (err) {
        console.error(err)
        return res.status(500).send({message:'No se encontro Productos'})
        
    }
}

export const listPA = async (req,res)=>{
    try {
        let producto = await productoModel.find({stock: 0})
        if(producto.length === 0 ||!producto )return res.status(404).send({message: 'No hay productos agotados mijo :D'})
        return res.send({producto})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al listar prodcutos ya agotados :/'})
    }
}