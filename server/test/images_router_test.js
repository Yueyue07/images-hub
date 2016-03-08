const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/images_app_test';
const server = require(__dirname + '/../server');
const Image = require(__dirname + '/../models/image');
var origin = 'localhost:3000';
var uri = '/api/images';

describe('Movie App REST API Test', () => {
  before((done) => {
    done();
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to create a new image with post', (done) => {
    chai.request(origin)
      .post(uri)
      .send({
        name: 'test', url: 'http://test.com',
        description: 'test', date: '2015' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test');
        expect(res.body.url).to.eql('http://test.com');
        expect(res.body.date).to.eql('2015');
        done();
      });
  });

  it('should be able to retrieve all our images', (done) => {
  chai.request(origin)
    .get(uri)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
});

describe('rest requests that require a image already in db', () => {
    beforeEach((done) => {
      Image.create({ name: 'test', url: 'http://test.com',
        description: 'test', date: '2015' }, (err, data) => {
        this.testImage = data;
        expect(err).to.eql(null);
        done();
      });
    });

    it('should be able to update a image', (done) => {
      chai.request(origin)
        .put(uri + '/' + this.testImage._id)
        .send({ name: 'new test image' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a image', (done) => {
      chai.request(origin)
        .del(uri + '/' + this.testImage._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
