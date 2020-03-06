const axios = require('axios').default;
const express = require('express');
const router = express.Router();
const _EXTERNAL_URL = process.env.REACT_APP_API_URL;

router.get('/getInfo', (req, res) => {
  const { service, username } = req.body;
  axios
    .get(_EXTERNAL_URL + '/' + service + '/' + username)
    .then(r => {
      res.send(r.data);
    })
    .catch(err => {
      console.log(err.data);
      res.send(err);
    });
});

router.post('/verify', (req, res) => {
  const { service, username } = req.body;
  axios
    .post(_EXTERNAL_URL + '/' + service + '/' + username + '/verify')
    .then(r => {
      res.send(r.data);
    })
    .catch(err => {
      console.log(err.data);
      res.send(err);
    });
});

router.post('/new-code', (req, res) => {
  const { service, username } = req.body;
  axios
    .post(_EXTERNAL_URL + '/new-code/' + service + '/' + username)
    .then(r => {
      res.send(r.data);
    })
    .catch(err => {
      console.log(err.data);
      res.send(err);
    });
});

router.post('/delete-verification', (req, res) => {
  const { service, username } = req.body;
  axios
    .delete(_EXTERNAL_URL + '/delete-verification/' + service + '/' + username)
    .then(r => {
      res.send(r.data);
    })
    .catch(err => {
      console.log(err.data);
      res.send(err);
    });
});

module.exports = router;
