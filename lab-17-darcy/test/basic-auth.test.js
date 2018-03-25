'use strict';

/* eslint-env node, jest */

const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/api/signup';
const SIGNIN_URL = SERVER_URL + '/api/signin';

function getUserParams() {
  // using + Math.rabdom() to avoid duplicate user errors
  return {
    username: 'bill' + Math.random(),
    email: 'bill@microsoft.com' + Math.random(),
    password: 'windows95'
  };
};

describe('/api/signup', () => {
  it('should return status 400 if missing username', (done) => {
    let params = getUserParams();
    delete params['username'];

    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .catch(err => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  it('should return status 400 if missing email', (done) => {
    let params = getUserParams();
    delete params['email'];

    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .catch(err => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  it('should return status 400 if missing password', (done) => {
    let params = getUserParams();
    delete params['password'];

    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .catch(err => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  it('should return status 200 with successful request', (done) => {
    let params = getUserParams();

    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(res => {
        expect(res.status).toEqual(200);
        done();
      });
  });
});

describe('/api/signin', () => {
  it('should return 401 unauthorized if password is incorrect', (done) => {
    let params = getUserParams();

    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(res => {
        expect(res.status).toEqual(200);

        // intentionally set the password as a wrong password
        let payload = params['username'] + ':' + 'wrongpassword';
        let encoded = btoa(payload);

        return superagent.get(SIGNIN_URL)
          .set('Authorization', 'Basic ' + encoded);
      })
      .catch(err => {
        expect(err.status).toEqual(401);
        done();
      });
  });

  it('should return 200 if username and password are', (done) => {
    let params = getUserParams();

    superagent.post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(res => {
        expect(res.status).toEqual(200);

        let payload = params['username'] + ':' + params['password'];
        let encoded = btoa(payload);

        return superagent.get(SIGNIN_URL)
          .set('Authorization', 'Basic ' + encoded);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        done();
      });
  });
});
