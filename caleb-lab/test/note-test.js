'use strict';

const Note = require('../model/note');
const http = require('http');
const Router = require('../lib/router.js');
const storage = require('../lib/storage.js');
const server = require('../server.js');

const expect = require('chai').expect;
const debug = require('debug')('http:server');

describe('note constructor module', function(){
  this.newNote = new Note('wat-man', 'today');
  it('should have a name of "wat-man"', done => {
    expect(this.newNote.name).to.equal('wat-man');
    console.log(this.newNote.name);
    done();
  });
  it('should have a date of "today"', done => {
    expect(this.newNote.date).to.equal('today');
    console.log(this.newNote.date);
    done();
  });
  it('should match uuid formatting', done => {
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
    expect(this.newNote.id).to.match(pattern);
    console.log(this.newNote.id);
    done();
  });
});
