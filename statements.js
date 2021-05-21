const getAll = `SELECT * FROM grad`;

const getGrad = (id) => `SELECT * FROM grad WHERE ID=${id};`;

const createGrad = (name, population) => `INSERT INTO grad (NAZIV, BROJ_STANOVNIKA) VALUES ("${name}", ${population});`;

const updateGrad = (id, population) => `UPDATE grad SET BROJ_STANOVNIKA = ${population} WHERE ID = ${id};`

module.exports = { getAll, getGrad, createGrad, updateGrad }