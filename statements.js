const getAll = `SELECT * FROM grad`;

const getGrad = (id) => `SELECT * FROM grad WHERE ID=${id}`;

module.exports = { getAll, getGrad }