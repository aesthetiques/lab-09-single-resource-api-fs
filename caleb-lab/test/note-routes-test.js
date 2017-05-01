'use strict';

const Note = require('../model/note');
const Router = require('../lib/router.js');
const storage = require('../lib/storage.js');
const server = require('../server.js');

const debug = require('debug')('http:server');
const http = require('chai-http');
const chai = require('chai');
const expect = chai.expect;

chai.use(http);

describe('server module', function(){
  before(done => {
    server.listen(3000);
    done();
  });
  after(done => {
    server.close();
    done();
  });

  describe('rest stages', function(){
    describe('post', function(){
      it('should run POST, respond with a 200, and make an object', done => {
        chai.request(server)
        .post('/api/note')
        .send({'name': 'ok corral', 'date': 'a long time ago'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          console.log('working', res.status);
          done();
      });
      });
      });
      });
      it('should respond with a 404', done => {
        chai.request(server)
        .post('/wat')
        .send({'name': 'ok corral', 'date': 'a long time ago'})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          console.log('[successful] fail', res.status);
          done();
        });
      });
    });
    // describe('GET', function(){
    //   // before(done => {
    //   //   chai.request(server)
    //   //   .post('/api/note')
    //   //   .send({'name': 'ok corral', 'date': 'a long time ago', 'id': '7f5dc40c-3042-42e3-8f06-f70b09f3714b'})
    //   //   .end((err, res) => {
    //   //     console.log();
    //   //     if(err) console.error(err);
    //   //     done();
    //   //   });
    //   // });
    //   // .send({'name': 'ok corral', 'date': 'a long time ago', 'id': '7f5dc40c-3042-42e3-8f06-f70b09f3714b'})
    //
    //   describe('get after post has completed?', function(){
    //     let getNote = {};
    //     it('should run a GET and respond with a 200 - success', function(){
    //       chai.request(server)
    //       .post('/api/note')
    //       .send({'getNote.name': 'ok corral', 'getNote.date': 'a long time ago'})
    //       .end((err, res) => {
    //         if(err) console.error(err);
    //         console.log('working', res.status);
    //       });
    //       console.log('GET working');
    //       console.log(getNote.id);
    //       chai.request(server)
    //       .get(`/api/note?id=${getNote.id}`)
    //       .end((err, res) => {
    //         if(err) console.error(err);
    //         expect(res.status).to.equal(200);
    //         done();
  //       });
  //       });
  //   });
  // });
