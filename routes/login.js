import express from 'express';
import { querySelect } from '../db/db.js';

const loginRoute = express.Router();

loginRoute.post('/', (req, res) => {
  const { email, password } = req.body;
  querySelect('SELECT * FROM Users', (users) => {
    const data = JSON.parse(users).find(
      (item) => item.Password === password && item.EmailAddress === email
    );
    if (data === undefined) {
      return res.json({
        status: 'error',
        message: 'User or password incorrect',
      });
    }
    return res.json({
      status: 'success',
      message: 'You are in',
    });
  });
});

export default loginRoute;
