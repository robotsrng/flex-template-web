const axios = require('axios').default;
const express = require('express');
const router = express.Router();
const _EXTERNAL_URL = 'http://149.248.52.69';

router.post('/calculate', (req, res) => {
  const { service, username } = req.body;
  axios
    .post(_EXTERNAL_URL + '/' + service + '/' + username + '/calculate')
    .then(r => {
      res.send(r.data);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
