import ProdutosServices from "../SERVICES/ProductService.js";

class ProductController{
  async index(req, res, next){
    try{
      const produtos = await ProdutosServices.listar();
      res.json(produtos)
    } catch (error){
      //next()-> NOrmalmente é chamado para passar para o próximo middleware ou rota
      next(error);//next()-> função que vamos usar para chamar o errorHandler
    }
  }

  async store(req, res, next){
    try{
      await ProdutosServices.criarProduto(req.body)
      res.status(201).json({message: "Produto cadastrado com sucesso"})
    }catch(error){
      next(error)
    }
  }

  async update(req, res, next){
    try{
      const {id} = req.params;

      await ProdutosServices.atualizar(id, req.body)
      res.status(201).json({message: "Produto atualizado com sucesso"})
    }catch(error){
      next(error)
    }
  }

  async destroy(req, res, next){
    try{
      const {id} = req.params;

      await ProdutosServices.deletar(id)
      res.status(201).json({message: "Produto removido com sucesso"})
    }catch(error){
      next(error)
    }
  }
}

export default new ProductController();

// async function index(req, res) {
//     try{
//     const produto = await Produto.getAllProducts();
//     return res.json(produto);
//     } catch (error) {
//   console.log(error);
//   return res.status(500).json({ error: "Error ao buscar produtos"});
//   }
// }

// async function store(req, res) {
//   try{
//     const produto = req.body;

//     await Produto.creatProduct(produto);
//     res.status(201).json({message: "Produto cadastrado com sucesso!"})
//   } catch (error) {
//     res.status(500).json({error: "Erro ao criar produto"});
//   }
// }

// async function update(req, res) {
//   try {
//     const { id } = req.params;
//     const produto = req.body;

//   await Produto.updateProduct(id, produto);
//   res.status(201).json({ message: "Produto atualizado com sucesso!"})    
//   } catch (error){
//     res.json({ error: "Erro ao atualizar produto!" })
//   }
// }

// async function destroy(req, res) {
//   try {
//     const { id } = req.params;

//     await Produto.deleteProduct(id);
//     res.status(200).json({ message: "Produto removido com sucesso! "})
//   } catch {
//     res.json({ message: "Erro ao remover produto! "})
//   }
// }
// export default { index, store, update, destroy }