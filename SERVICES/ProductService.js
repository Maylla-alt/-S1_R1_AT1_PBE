import CategoriaRepository from "../repositories/CategoryRepository.js"
import Produto from "../models/ProductModel.js"
import ProductRepository from "../repositories/ProductRepository.js";
import {validarCamposObrigadorios, validarPreco, validarEstoque}  from "../validators/product.validador.js"

class ProductServices{
    async listar(){
        return await ProductRepository.getAll()
    }

    async criarProduto(data){
        validarCamposObrigadorios(data);
        validarPreco(data)
        validarEstoque(data)

        //getById
        //Vai me retorna todas as informações da categoria
        let categoria = await CategoriaRepository.getById(data.categoria_id)

        if (!categoria){
            throw new Error("Categoria não existe")
        }

        if(categoria.status === 0){
            throw new Error("Não é possível cadastrar produto em categoria desativada")
        }

        if(data.destaques){
            const totalDestaques = await ProductRepository.countDestaques()

            if(totalDestaques >= 5){
                throw new Error("Limite de produtos em destaque atingido")
            }
        }

        //Model -> Cuida da estrutura dos dados
        const produto = new Produto(data)

        //Repository -> Cuida do banco(INSERT, UPDATE, SELECT)
        return await ProductRepository.creatProduct(produto)
    }

    async atualizar(id, data){
        if(!id){
            throw new Error("ID do Produto é obrigatório")
        }

        const produtoAtual = await ProductRepository.getById(id);

        if(!produtoAtual){
            throw new Error("Produto não encontrado!")
        }

        if(data.categoria_id){
            const categoria = await CategoriaRepository.getById(data.categoria_id)

            if(!categoria || categoria.status === 0){
                throw new Error("Categoria inválida ou desativada")
            }
        }

        validarCamposObrigadorios(data)
        validarPreco(data)
        validarEstoque(data)

        if(data.destaques && !produtoAtual.destaques){
            const totalDestaques = await ProductRepository.countDestaques()

            if(totalDestaques >= 5){
                throw new Error("Limite de produtos em destaque atingido")
            }
        }

                //Model -> Cuida da estrutura dos dados
        const produto = new Produto(data)

        //Repository -> Cuida do banco(INSERT, UPDATE, SELECT)
        return await ProductRepository.updateProduct(id, produto)
    }

    async deletar(id){
        if(!id){
            throw new Error("ID do Produto é obrigatório")
        }

        return await ProductRepository.deleteProduct(id)
    }
}

export default new ProductServices()