var assert = require('assert');
const sqlite3 = require('sqlite3').verbose();
var expect  = require("chai").expect;
var axios = require("axios");
const { getAll, deleteLondon } = require("../statements");

let db = new sqlite3.Database('./grad.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the grad database.');
});

describe('TESTS', function() {
  let gradovi = [];
  const buildUrl = (id) => `http://localhost:3000/gradovi/${id}`;

  before(function(done) {
    db.all(deleteLondon, [], (err, rows) => {
      if(err) {
        throw err;
      }
      done();
    })
  })

  this.beforeEach(function(done) {
    db.all(getAll, [], (err, rows) => {
      if(err) {
        throw err;
      }
      gradovi = rows;
      done();
    })
  });

  describe('GET METHODS', function() {
    describe('TEST GET ALL', function() {
      it('should return all cities from DB', async function() {
        try {
          const response = await axios.get(buildUrl(""));
          expect(response.data.length).to.equal(gradovi.length);
        } catch (error) {
          assert.equal(1, -1);
        }
      });
    });
    describe('TEST GET CITY BY ID', function() {
      it('should return city Sarajevo', async function() {
        try {
          const response = await axios.get(buildUrl("1"));
          expect(response.data.nazin).to.equal(gradovi[0].naziv);
        } catch (error) {
          assert.equal(1, -1);
        }
      });
    });
  });

  describe('POST METHOD', function() {
    describe('TEST CREATE CITY', function() {
      const url = `http://localhost:3000/grad`;
      it('should successufully create city London', async function() {
        const response = await axios.post(url, { naziv: "London", broj_stanovnika: 1000});
        const response2 = await axios.get(buildUrl(""));
        expect(response.data.message).to.equal("Successfully created city.");
        assert.equal(gradovi.length + 1, response2.data.length);
      });
    });
  });

  describe('PUT METHOD', function() {
    describe('TEST UPDATE CITY BY ID', function() {
      it('should successufully update city London', async function() {
        const index = gradovi.findIndex((el) => el.NAZIV == "London");
        const response = await axios.put(buildUrl(gradovi[index].ID), { broj_stanovnika: 2000});
        const response2 = await axios.get(buildUrl(""));
        expect(response.data.message).to.equal("Successfully updated city.");
        assert.equal(response2.data[index].BROJ_STANOVNIKA, 2000);
      });
    });
  });

  describe('DELETE METHOD', function() {
    describe('TEST DELETE CITY BY ID', function() {
      it('should successufully delete city London', async function() {
        const index = gradovi.findIndex((el) => el.NAZIV == "London");
        const response = await axios.delete(buildUrl(gradovi[index].ID));
        const response2 = await axios.get(buildUrl(""));
        expect(response.data.message).to.equal("Successfully deleted city.");
        assert.equal(response2.data.findIndex((el) => el.NAZIV == "London"), -1);
      });
    });
  });
})


