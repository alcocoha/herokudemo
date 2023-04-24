import express from "express";
import { v4 as uuidv4 } from "uuid";
import db, { queryInsert, querySelect, queryDelete } from "../db/db.js";

const mealsRoute = express.Router();

/**
 * Method: GET
 * To get all meals
 */
mealsRoute.get("/", (req, res) => {
	querySelect("SELECT * FROM Meals", (users) => {
		const data = JSON.parse(users).map((item) => ({ ...item, Password: "Not available to view" }));
		res.json({
			status: "ok",
			data
		});
	});
});

/**
 * Method: POST
 * Create a meals
 */
mealsRoute.post("/create", function (req, res) {
	console.log(req.body);
	const { title, description, image, price, additionalInfo } = req.body;

	queryInsert({
		table: "Meals",
		columns: ["MealID", "Title", "Description", "Image", "Price", "AdditionalInfo"],
		columnsValue: [uuidv4(), title, description, image, price, additionalInfo]
	});
	res.json({
		status: "ok",
		message: "Meal created successfully"
	});
});

mealsRoute.delete('/delete/:id', async (req, res) => {
	console.log('first', req.params.id)
  queryDelete(req.params.id, 'Meals', 'MealID');
  res.json({
    status: 'ok',
    data: 'Meal deleted!',
  });
});

export default mealsRoute;
