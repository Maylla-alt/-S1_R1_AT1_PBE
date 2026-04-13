import pool from "../database/connection.js";

class ProdutoRepository{
    async getAll () {

    const [rows] = await pool.query('SELECT * FROM Produtos');

    return rows;
}

async getById(id){
    const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id])
    return rows[0]
}

async desativarPorCategoria(categoriaId){
    await pool.query("UPDATE produtos SET status = 0 WHERE categoria_id = ?",[categoriaId])
}    

async countByCategoria(categoriaId){
    //Buscar a quantidade de produtos relacionados a categoria X
    //Categoria ID 1
    //20 produtos que estão relacionados com essa categoria
    const [rows] = await pool.query('SELECT COUNT(*) as TOTAL FROM produtos WHERE categoria_id = ?', [categoriaId])
    return rows[0].total
}

async countDestaques(){
    const [rows] = await pool.query('SELECT COUNT(*) as total FROM produtos WHERE destaque = 1')
    return rows[0].total;
}

async creatProduct(produto) {
    const [result] = await pool.query(`INSERT INTO produtos (
        nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, categoria_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
[
    produto.nome,
    produto.descricao,
    produto.preco,
    produto.quantidade_estoque,
    produto.status,
    produto.destaque,
    produto.marca,
    produto.modelo,
    produto.garantia_meses,
    produto.categoria_id
])
    return result.insertID;
}

async updateProduct(id, produto) {
    const [result] = await pool.query(`UPDATE produtos SET
        nome = ?,
        descricao = ?,
        preco = ?,
        quantidade_estoque = ?,
        status = ?,
        destaque = ?,
        marca = ?,
        modelo = ?,
        garantia_meses = ?,
        categoria_id = ?
        WHERE id = ?
        `, [
            produto.nome,
            produto.descricao,
            produto.preco,
            produto.quantidade_estoque,
            produto.status,
            produto.destaque,
            produto.marca,
            produto.modelo,
            produto.garantia_meses,
            produto.categoria_id,
            id
        ])

        return result.affectedRows;
}

async  deleteProduct(id) {
const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [id])

return result.affectedRows;
}
}

export default new ProdutoRepository()

// async function getAllProducts () {

//     const [rows] = await pool.query('SELECT * FROM Produtos');

//     return rows;
// }

// async function creatProduct(produto) {
//     const { 
//         nome, 
//         descricao, 
//         preco, 
//         quantidade_estoque, 
//         status, 
//         destaque, 
//         marca, 
//         modelo, 
//         garantia_meses,
//         id_categoria
//     } = produto;

//     const [result] = await pool.query(`INSERT INTO produtos (
//         nome, descricao, preco, quantidade_estoque, status, destaque, marca, modelo, garantia_meses, id_categoria
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
// [
//     nome,
//     descricao,
//     preco,
//     quantidade_estoque,
//     status,
//     destaque,
//     marca,
//     modelo,
//     garantia_meses,
//     id_categoria
// ])
//     return result.insertID;

// }

// async function updateProduct(id, produto) {
// const { 
//         nome,
//         descricao, 
//         preco, 
//         quantidade_estoque, 
//         status, 
//         destaque, 
//         marca, 
//         modelo, 
//         garantia_meses,
//         id_categoria
//     } = produto;
    
//     const [result] = await pool.query(`UPDATE produtos SET
//         nome = ?,
//         descricao = ?,
//         preco = ?,
//         quantidade_estoque = ?,
//         status = ?,
//         destaque = ?,
//         marca = ?,
//         modelo = ?,
//         garantia_meses = ?,
//         id_categoria = ?
//         WHERE id = ?
//         `, [
//             nome,
//             descricao,
//             preco,
//             quantidade_estoque,
//             status,
//             destaque,
//             marca,
//             modelo,
//             garantia_meses,
//             id_categoria,
//             id
//         ])

//         return result.affectedRows;
// }

// async function deleteProduct(id) {
// const [result] = await pool.query(`DELETE FROM produtos WHERE id = ?`, [id])

// return result.affectedRows;
// }

// export default { getAllProducts, creatProduct, updateProduct, deleteProduct }
