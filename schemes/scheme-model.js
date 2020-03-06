const knex = require('knex');
const config = require('../knexfile.js')
const db = knex(config.development);

function find() {
  return db('schemes');
}

function findById(schemeId) {
  return db('schemes').where({id: schemeId});
}

function findSteps(schemeId) {
  return db('steps as s').select(['s.id', 's.step_number', 's.instructions', 'sc.scheme_name']).where({scheme_id: schemeId}).join('schemes as sc', 's.scheme_id', '=', 'sc.id').orderBy('step_number', 'asc');
}

function add(scheme) {
  return db('schemes').insert(scheme).then(response => {
    return db('schemes').where({id: response[0]});
  }).catch(err => {
    return "There was an error" + err;
  })
}

function update(changes, id) {
  return db('schemes').where({id: id}).update(changes).then(response => {
    return db('schemes').where({id: id});
  }).catch(err => {
    return "There was an error";
  })
}

function remove(id) {
  return db('schemes').where({id: id}).then(response => {
      return db('schemes').where({id: id}).del().then(res => {
        console.log(res)
        if (res === 1) {
          return response;
        } else {
          return null;
        }
      }).catch(err => {
        return null;
      });
  }).catch(err => {
    return null
  })
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}
