import Categoria from "../models/CategoryModel.js"
import Produtos from "../models/ProductModel.js"
import CategoryRepository from "../repositories/CategoryRepository.js"
import ProdutoRepository from "../repositories/ProductRepository.js"

class CategoriasService{
    async desativar(id){
        if(!id || isNaN(id)){
            throw new Error("ID da categoria é obrigatório")
        }

        //Verificando se a categoria existe
        const categoria = Categoria.getById(id)

        if(categoria){
            throw new Error("Categoria não encontrada")
        }
        
        //Desativa a categoria encontrada
        await Categoria.updateStatus(id, 0)

        //Desativando produtos da categoria
        await Categoria.updateStatus(id, 0)

        //Desativar produtos da categoria
        await Produtos.desativarPorCategoria(id)

        return { message: "Categoria e produtos desativados com sucesso"}
    }

    async delete(id){
        const totalProdutos = await ProdutoRepository.countByCategoria(id)
        //console.log("Boa tarde")

if(totalProdutos > 0){
    throw new Error("Não é possível excluir categoria com produtos vinculados")
}

return await CategoryRepository.deleteCategory(id)
    }

    async getAll(){
        return await CategoryRepository.getAllCategorys()
    }

    async creatCategory(id, data){
        const categoria = new Categoria(data)

        return await CategoryRepository.creatCategory(id, categoria)
    }

    async updateCategory(id, data){
        const update = new Categoria(data)

        return CategoryRepository.updateCategory(id, update)
    }
}

export default new CategoriasService()