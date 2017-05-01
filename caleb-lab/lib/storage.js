'use strict';

//this is the in-memory mgmt for a model
const debug = require('debug')('http:storage');
const persistancePath = `${__dirname}/../data`;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Async'});
const storage = {};
// const storage = {
//   schemaOne: {
//     idOne: {},
//     idTwo: {},
//   },
//   schemaTwo: {
//     idOne: {},
//     idTwo: {},
//   },
// };

module.exports = exports = {};

//this is going to be a route in the server for posting a new note
exports.createNote = function(schema, note){
  if(!schema) return Promise.reject(new Error('Schema required'));
  if(!note) return Promise.reject(new Error('Note required'));
  if(!storage[schema]) storage[schema] = {}; //take the value of schema and set it as a property of storage
  storage[schema][note.id] = note; //storage.schema.id
  storage['note'] = {};
  storage['note'][note.id] = note;
  console.log(note);
  // return Promise.resolve(note);
  return fs.statProm(`${persistancePath}`)
    .catch(err => {
      err.status = 400;
      return Promise.reject(err);
    })
    .then(() => {
      fs.writeFileProm(`${persistancePath}/${schema}${note.id}.json`);
    }).then(() => {
      return Promise.resolve(note);
    });
};

exports.fetchNote = function(schema, id){
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id require'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('Schema does not exist'));

    let note = schemaName[id];
    if(!note) return reject(new Error('Note doesnt exist'));

    resolve(note);
  });
};

exports.updateNote = function(schema, note){
  debug('#updateNote');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Schema required'));
    if(!note) return reject(new Error('Note required'));
    console.log(note);
    storage[schema][note.id] = note; //storage.note.id = note.

    resolve(note);
  });
};

exports.deleteNote = function(schema, id){
  debug('#deleteNote');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('Note id require'));
    delete storage[schema][id];

    resolve();
  });
};
