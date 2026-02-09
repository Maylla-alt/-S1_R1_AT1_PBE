import Categoria from "../models/Categoria.js";

async function index(req, res) {
    try{
    const categoria = await Categoria.getAllCategorys();
    return res.json(categoria);
    } catch (error) {
console.log(error);
return res.status(500).json({ error: "Error ao encontrar categoria"});
}
}

async function store(req, res) {
try{
    const categoria = req.body;

    await Categoria.creatCategory(categoria);
    res.status(201).json({message: "Categoria cadastrada com sucesso!"})
} catch (error) {
    res.status(500).json({error: "Erro ao criar categoria"});
}
}

async function update(req, res) {
try {
    const { id } = req.params;
    const categoria = req.body;

await Categoria.updateCategory(id, categoria);
res.status(201).json({ message: "Categoria atualizada com sucesso!"})    
} catch (error){
    res.json({ error: "Erro ao atualizar categoria!" })
}
}

async function destroy(req, res) {
try {
    const { id } = req.params;

    await Categoria.deleteCategory(id);
    res.status(200).json({ message: "Categoria removida com sucesso! "})
} catch {
    res.json({ message: "Erro ao remover categoria! "})
}
}

export default { index, store, update, destroy }
