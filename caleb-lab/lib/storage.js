'use strict'

//this is the in-memory mgmt for a model
const debug = require('debug')('http:storage')
const persistancePath = `${__dirname}/../data`
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Async'})
const storage = {}



//this is going to be a route in the server for posting a new note
exports.createNote = function(schema, note){
  if(!schema) return Promise.reject(new Error('Schema required'))
  if(!note) return Promise.reject(new Error('Note required'))


  //does this particular file exist
  return fs.statProm(`${persistancePath}`)
  //if it doesn't exist, send error, 400, reject = throw err
  .catch(err => {
    err.status = 400
    return Promise.reject(err)
  })
  .then(() => {
    //if the catch doesnt trigger, we write a file to this directory and stringify the data
    fs.writeFileProm(`${persistancePath}/${schema}${note.id}.json`, JSON.stringify(note))
    .then(note => {
      //then resolves
      console.log(note)
    })
  }).then(() => {
    return Promise.resolve(note)
  })
}

exports.fetchNote = function(schema, id){
  debug('#fetchNote')
  if(!schema) return Promise.reject(new Error('schema required'))
  if(!id) return Promise.reject(new Error('id require'))

  let readFile = `${persistancePath}/${schema}${id}.json`

  return fs.statProm(readFile)
  .catch(err => {
    err.status = 400
    return Promise.reject(err)
  })
  .then(() => {
    return fs.readFileProm(readFile)
  }).then(data => {
    return JSON.parse(data.toString())
  })
}

exports.updateNote = function(schema, note){
  debug('#updateNote')
  if(!schema) return Promise.reject(new Error('Schema required'))
  if(!note) return Promise.reject(new Error('Note required'))
  // console.log(note)
  // storage[schema][note.id] = note //storage.note.id = note.
  //
  // resolve(note)

  //does this particular file exist
  return fs.statProm(`${persistancePath}`)
  //if it doesn't exist, send error, 400, reject = throw err
  .catch(err => {
    err.status = 400
    return Promise.reject(err)
  })
  .then(() => {
    //if the catch doesnt trigger, we write a file to this directory and stringify the data
    fs.writeFileProm(`${persistancePath}/${schema}${note.id}.json`, JSON.stringify(note))
    .then(note => {
      //then resolves
      console.log(note)
    })
  }).then(() => {
    return Promise.resolve(note)
  })
}

exports.deleteNote = function(schema, id){
  debug('#deleteNote')
  if(!schema) return Promise.reject(new Error('schema required'))
  if(!id) return Promise.reject(new Error('Note id require'))
  let readFile = `${persistancePath}/${schema}${id}.json`
  return fs.statProm(readFile)
  .catch(err => {
    err.status = 400
    return Promise.reject(err)
  })
  .then(() => {
    return fs.unlinkProm(readFile)
  })
  .then(() => {
    return Promise.resolve()
  })
}
