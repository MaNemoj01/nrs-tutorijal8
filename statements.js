const getAll = `SELECT * FROM grad`;

const getGrad = (id) => `SELECT * FROM grad WHERE ID=${id};`;

const createGrad = (name, population) => `INSERT INTO grad (NAZIV, BROJ_STANOVNIKA) VALUES ("${name}", ${population});`;

const updateGrad = (id, population) => `UPDATE grad SET BROJ_STANOVNIKA = ${population} WHERE ID = ${id};`

const deleteGrad = (id) => `DELETE FROM grad WHERE ID = ${id};`

const deleteLondon = `DELETE FROM grad WHERE NAZIV = "London";`

module.exports = { getAll, getGrad, createGrad, updateGrad, deleteGrad, deleteLondon }