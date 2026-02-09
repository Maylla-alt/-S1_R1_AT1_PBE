import pool from "../database/connection.js"

async function getAllCategorys () {

    const [rows] = await pool.query('SELECT * FROM Categoria');

    return rows;
}

async function creatCategory(categoria) {
    const { 
        nome, 
        descricao 
    } = categoria;

    const [result] = await pool.query(`INSERT INTO categoria ( nome, descricao) VALUES(?, ?)`,
    [
        nome,
        descricao
    ])
    return result.insertID;
}

async function updateCategory(id, categoria) {
    const {
        nome,
        descricao
    } = categoria;

    const [result] = await pool.query(`UPDATE categoria SET
        nome = ?,
        descricao = ?
        WHERE id = ?
        `, [
            nome,
            descricao,
            id
        ]
    ) 
    return result.affectedRows;
}

async function deleteCategory(id) {
    const [result] = await pool.query(`DELETE FROM categoria WHERE id = ?`, [id])

    return result.affectedRows
}

export default { getAllCategorys, updateCategory, creatCategory, deleteCategory  }
