const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
}

async function add(user) {
  return db('users').insert(user)
}

function find() {
  return db('users')
}

function findBy(filter) {
  return db('users').where(filter)
}

async function findById(id) {
  return db('users').where({id}).first()
}