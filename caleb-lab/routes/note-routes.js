'use strict';

const debug = require('debug')('http:note-routes');
const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// due to thie use of bluebird, we no longer have to do the following:
// fs.readFile('/somepath', function(err, data){
//   dostuff
// })

// now we do
// When we require in the fs module and feed it into the promisify all, we add the suffix prom. when we say fs.readfile prom, we are now going to asynchronously read that file, and below that line we can now say .then
// fs.readFileProm(`${__dirname}/../data/one.txt`)
//   .then(data => {
//     console.log(data.toString('utf-8', 0, 16));
//     fs.writeFileProm(`${__dirname}/../data/five.json`, data)
//     .then(console.log)
//     .catch(console.error);
//   })
//   .catch(console.error);
module.exports = function(router){
  
router.get('/api/note', (req, res) => {
  debug('GET /api/note');
  console.log(req.body);
  if(req.url.query.id){
    storage.fetchNote('note', req.url.query.id)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      }).catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
    return;
  }

  //if condition was false, do this
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('fo-hunnit bad request');
  res.end();
});

router.post('/api/note', (req, res) => {
  debug('POST api/note');
  console.log(req.body);
  try{
    let newNote = new Note(req.body.name, req.body.date);
    storage.createNote('note', newNote);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(newNote));
    res.end();
  }catch(e){
    console.error(e, 'this is visible');
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('fo-hunnit bad request');
    res.end();
  }
});

router.put('/api/note', (req, res) => {
  debug('PUT /api/note');
  storage.updateNote('note', req.body)
    .then(note => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
});

router.delete('/api/note', (req, res) =>{
  debug('DELETE /api/note');
  console.log('deleting');
  storage.deleteNote('note', req.url.query.id)
  .then(() => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();
  }).catch(err =>{
    console.error(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('not found');
    res.end();
  });
});
};
