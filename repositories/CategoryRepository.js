import pool from "../database/connection.js"

class CategoryModel{

async getById(id) {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id])
    return rows[0]
}

async getAllCategorys () {

    const [rows] = await pool.query('SELECT * FROM categorias');

    return rows;
}

async creatCategory(categoria) {
    const { 
        nome, 
        descricao,
        status
    } = categoria;

    const [result] = await pool.query(`INSERT INTO categorias ( nome, descricao, status ) VALUES(?, ?, ?)`,
    [
        categoria.nome,
        categoria.descricao,
        categoria.status
    ])
    return result.insertID;
}

async updateCategory(id, categoria) {
    // const {
    //     nome,
    //     descricao,
    //     status
    // } = categoria;

    const [result] = await pool.query(`UPDATE categorias SET
        nome = ?,
        descricao = ?,
        status = ?
        WHERE id = ?
        `, [
            categoria.nome,
            categoria.descricao,
            categoria.status,
            id
        ]
    ) 
    return result.affectedRows;
}

async deleteCategory(id) {
    const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id])

    return result.affectedRows
}

async updateStatus(id, status) {
    const [rows] = await pool.query('UPDATE categorias SET status = ? WHERE id = ?', [status, id])
    return rows
}
}

export default new CategoryModel()
