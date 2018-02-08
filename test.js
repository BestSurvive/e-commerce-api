var assert = require('assert');
const request = require('supertest');
const app = require('./app');

describe('GET /admin', function() {
  it('test success, correct token, user buyed', function(done) {
        request(app)
        .get('/admin/buyed/luca?token=Admin')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
    it('test success, correct token, all buyed', function(done) {
          request(app)
          .get('/admin/buyed?token=Admin')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
      });
      it('test success, wrong token, user buyed', function(done) {
            request(app)
            .get('/admin/buyed/luca?token=Pippo')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
        });
        it('test success, wrong token, all buyed', function(done) {
              request(app)
              .get('/admin/buyed?token=Pippo')
              .set('Accept', 'application/json')
              .expect(401)
              .end(function(err, res) {
              if (err) {
                return done(err);
              }
              done();
            });
          });
  });
  describe('GET /users/products', function() {
    it('test success, correct token, array user buyed', function(done) {
        request(app)
        .get('/users/products')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
  describe('GET /users/:user/:idp', function() {
      it('test success, correct token, product buyed', function(done) {
            request(app)
            .get('/users/luca/2?token=Pippo')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
            if (err) {
              return done(err);
            }
            done();
          });
        });
        it('test success, wrong token, no buy', function(done) {
              request(app)
              .get('/users/luca/2?token=Ciao')
              .set('Accept', 'application/json')
              .expect(401)
              .end(function(err, res) {
              if (err) {
                return done(err);
              }
              done();
            });
          });
        it('test success, wrong id, no buy', function(done) {
              request(app)
              .get('/users/luca/0?token=Sempronio')
              .set('Accept', 'application/json')
              .expect(404)
              .end(function(err, res) {
              if (err) {
                return done(err);
              }
              done();
            });
          });
        });

        describe('DELETE /admin/del/:id', function() {
          it('test success, correct token, delete product', function(done) {
                request(app)
                .delete('/admin/del/1?token=Admin')
                .set('Accept', 'application/json')
                .expect(200)
                .end(function(err, res) {
                if (err) {
                  return done(err);
                }
                done();
              });
            });

            it('test success, wrong id, no del', function(done) {
                  request(app)
                  .delete('/admin/del/100?token=Admin')
                  .set('Accept', 'application/json')
                  .expect(404)
                  .end(function(err, res) {
                  if (err) {
                    return done(err);
                  }
                  done();
                });
              });
            it('test success, wrong token, no del', function(done) {
                  request(app)
                  .delete('/admin/del/1?token=Caio')
                  .set('Accept', 'application/json')
                  .expect(401)
                  .end(function(err, res) {
                  if (err) {
                    return done(err);
                  }
                  done();
                });
              });
            });

            describe('POST /admin/add', function() {
              it('test success, correct token, add product', function(done) {
                    request(app)
                    .post('/admin/add?token=Admin')
                    .send({product: "kitkat", amount:5})
                    //.send({product: "kitkat", amount:5})
                    //.send({product:"kitkat", amount:5})
                    //.send({product: "kitkat"})
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, res) {
                    if (err) {
                      return done(err);
                    }
                    done();
                  });
                });
                it('test success, wrong token, no add', function(done) {
                      request(app)
                      .post('/admin/add?token=Caio')
                      .set('Accept', 'application/json')
                      .expect(401)
                      .end(function(err, res) {
                      if (err) {
                        return done(err);
                      }
                      done();
                    });
                  });
                });

                describe('PUT /admin/up/:id', function() {
                  it('test success, correct token, product update', function(done) {
                        request(app)
                        .put('/admin/up/4?token=Admin')
                        .send({product: "kitkat", amount:5})
                        .set('Accept', 'application/json')

                        .expect(200)
                        .end(function(err, res) {
                        if (err) {
                          return done(err);
                        }
                        done();
                      });
                    });
                    it('test success, wrong token, no put', function(done) {
                          request(app)
                          .put('/admin/up/1?token=Caio')
                          .send({product: "kitkat", amount:5})
                          .set('Accept', 'application/json')
                          .expect(401)
                          .end(function(err, res) {
                          if (err) {
                            return done(err);
                          }
                          done();
                        });
                      });
                      it('test success, wrong id, no put', function(done) {
                            request(app)
                            .put('/admin/up/100?token=Admin')
                            .send({product: "kitkat", amount:5})
                            .set('Accept', 'application/json')
                            .expect(404)
                            .end(function(err, res) {
                            if (err) {
                              return done(err);
                            }
                            done();
                          });
                        });
                        it('test success, didnt insert a correct params, no put', function(done) {
                              request(app)
                              .put('/admin/up/2?token=Admin')
                              //.send({amount:5})
                              .send({product:"kitkat"})
                              .set('Accept', 'application/json')
                              .expect(403)
                              .end(function(err, res) {
                              if (err) {
                                return done(err);
                              }
                              done();
                            });
                          });
                    });
