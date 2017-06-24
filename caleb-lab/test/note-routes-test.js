'use strict'

const server = require('../server.js')

const debug = require('debug')('http:server')
const http = require('chai-http')
const chai = require('chai')
const expect = chai.expect

chai.use(http)

describe('server module', function(){
  describe('rest stages', function(){
    before(done => {
      server.listen(3000)
      done()
    })
    let testNote
    before(done => {
      chai.request(server)
      .post('/api/note')
      .send({'name': 'ok corral', 'date': 'a long time ago', 'id': '7f5dc40c-3042-42e3-8f06-f70b09f3714b'})
      .end((err, res) => {
        if(err) console.error(err)
        testNote = JSON.parse(res.text.toString())
        done()
      })
    })
    afterEach(done => {
      chai.request(server)
      .del(`/api/note?id=${testNote.id}`)
      .end((err, res) => {
        if(err) console.error(err.message)
      })
      server.close()
      done()
    })

    describe('post', () => {
      it('should run POST, respond with a 200, and make an object', done => {
        chai.request(server)
        .post('/api/note')
        .send({'name': 'ok corral', 'date': 'a long time ago'})
        .end((err, res) => {
          if(err) console.error(err)
          expect(res.status).to.equal(200)
          done()
        })
      })
    })
    it('should respond with a 404', done => {
      chai.request(server)
      .post('/wat')
      .send({'name': 'ok corral', 'date': 'a long time ago'})
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
    })

    describe('GET', () => {
      describe('GET request', () => {
        it('should run a GET and respond with a 200 - success', done => {
          chai.request(server)
          .get(`/api/note?id=${testNote.id}`)
          .end((err, res) => {
            if(err) console.error(err.message)
            expect(res.status).to.equal(200)
            done()
          })
        })
        it('should run a GET and respond with a 404 - not found', done => {
          chai.request(server)
          .get(`/api/note?id=blargblarg`)
          .end((err, res) => {
            if(err) console.error(err.message)
            expect(res.status).to.equal(404)
            done()
          })
        })
      })
    })

    describe('PUT', () => {
      describe('should edit a previously made note', () => {
        it('should change the value of the note', done => {
          chai.request(server)
          .put(`/api/note?id=${testNote.id}`)
          .send({'name': 'magic the gathering', 'date': 'any day now', 'id': testNote.id})
          .end((err, res) => {
            if(err) console.error(err.message)
            expect(res.status).to.equal(200)
            done()
          })
        })
      })

      describe('DELETE', function(){
        let testDeleteNote
        before(done => {
          chai.request(server)
          .post('/api/note')
          .send({'name': 'ok corral', 'date': 'a long time ago', 'id': '7f5dc40c-3042-42e3-8f06-f70b09f3714b'})
          .end((err, res) => {
            if(err) console.error(err)
            testDeleteNote = JSON.parse(res.text.toString())
            done()
          })
        })
        after(done => {
          chai.request(server)
          .del(`/api/note?id=${testDeleteNote.id}`)
          .end(err => {
            if(err) console.error(err.message)
            server.close()
            done()
          })
        })
        describe('should delete a note', () => {
          it('should delete a note', done => {
            chai.request(server)
            .del(`/api/note?id=${testDeleteNote.id}`)
            .end((err, res) => {
              if(err) console.error(err.message)
              expect(res.status).to.equal(204)
              done()
            })
          })

          it('shouldn\'t be able to find a deleted note', done => {
            chai.request(server)
            .get(`/api/note?id=${testDeleteNote.id}`)
            .end((err, res) => {
              if(err) console.error(err.message)
              expect(res.status).to.equal(404)
              done()
            })
          })
        })

      })
    })
  })
})
