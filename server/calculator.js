const axios = require('axios').default;
const express = require('express');
const router = express.Router();
const _EXTERNAL_URL = process.env.REACT_APP_API_URL;

router.post('/calculate', (req, res) => {
  const { service, username } = req.body;
  axios
    .post(_EXTERNAL_URL + '/' + service + '/' + username + '/calculate')
    .then(r => {
      res.send(r.data);
    })
    .catch(err => {
      console.log(err.data);
      res.send(err);
    });
});

module.exports = router;
