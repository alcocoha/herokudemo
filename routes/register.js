import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db, { queryInsert, querySelect } from '../db/db.js';

const registersRoute = express.Router();

/**
 * Method: POST
 * Create a register
 */
registersRoute.post('/create', function (req, res) {
  const { name, lastname, email, password, phone } = req.body;

  // Here we need to get roles
  querySelect('SELECT * FROM Users', (users) => {
    const userExist = JSON.parse(users).find(
      (item) => item.EmailAddress === email
    );
    if (userExist) {
      return res.json({
        status: 'error',
        message: 'This email is already created',
      });
    }
    queryInsert({
      table: 'Users',
      columns: [
        'UserID',
        'Name',
        'Lastname',
        'Password',
        'EmailAddress',
        'Phone',
        'Active',
      ],
      columnsValue: [uuidv4(), name, lastname, password, email, phone, 1],
    });
    res.json({
      status: 'ok',
      message: 'Register created successfully',
    });
  });
});

/**
 * Method: GET
 * To get all registers
 */
registersRoute.get('/users', (req, res) => {
  querySelect('SELECT * FROM Users', (users) => {
    const data = JSON.parse(users).map((item) => ({
      ...item,
      Password: 'Not available to view',
    }));
    res.json({
      status: 'ok',
      data,
    });
  });
});

export default registersRoute;
