const app = require('./../server') // Link to your server file
const supertest = require('supertest')
// const request = supertest(app)
const request = require('supertest');
const express = require('express');
const db = require(".././models");
const Washer = db.washers;
const Mode = db.modes;
app.listen(8084)

test("GET /modes", async () => {
	await supertest(app)
		.get("/api/modes")
		.expect(200)
		.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(200)
		})
});

test("GET /washers", async () => {
	await supertest(app)
		.get("/api/washers")
		.expect(200)
		.then((response) => {
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(200)
		})
});

test("DELETE /api/modes/:id", async () => {
	const mode = await Mode.create({
		name: "test mode delete",
		duration: "80",
		temperature: "60",
		spinSpeed: "1200"
	});

	await supertest(app)
		.delete("/api/modes/" + mode.id)
		.expect(200)
		.then(async () => {
			expect(await Mode.findByPk( mode.id )).toBeFalsy()
		})
});


test("DELETE /api/washers/:id", async () => {
	const washer = await Washer.create({
		name: "test delete washer",
		hash: "kdsjgadfdjdgoswdfj",
		model: "test model"
	});

	await supertest(app)
		.delete("/api/washers/" + washer.id)
		.expect(200)
		.then(async () => {
			expect(await Washer.findByPk( washer.id )).toBeFalsy()
		})
});

test("POST /api/modes", async () => {
	const data = {
		name: "mode test",
		duration: 80,
		temperature: 60,
		spinSpeed: 1200
	}

	await supertest(app)
		.post("/api/modes")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body.id).toBeTruthy()
			console.log(response.body, response.body.id)
			expect(response.body.name).toBe(data.name)
			expect(response.body.duration).toBe(data.duration)
			expect(response.body.spinSpeed).toBe(data.spinSpeed)
			expect(response.body.temperature).toBe(data.temperature)

			// Check the data in the database
			const mode = await Mode.findByPk(response.body.id)
			expect(mode).toBeTruthy()
			expect(mode.name).toBe(data.name)
			expect(mode.duration).toBe(data.duration)
			expect(mode.spinSpeed).toBe(data.spinSpeed)
			expect(mode.temperature).toBe(data.temperature)
		})
});

test("POST /api/washers", async () => {
	const data = {
		name: "washers post test",
		hash: "kdsjgadfdjdgoswdfj",
		model: "test model"
	};

	await supertest(app)
		.post("/api/washers")
		.send(data)
		.expect(200)
		.then(async (response) => {
			// Check the response
			expect(response.body.id).toBeTruthy();
			expect(response.body.model).toBe(data.model);
			expect(response.body.name).toBe(data.name);

			// Check the data in the database
			const washer = await Washer.findByPk(response.body.id);
			expect(washer).toBeTruthy();
			expect(washer.name).toBe(data.name);
			expect(washer.model).toBe(data.model);
		})
});

test("UPDATE /api/modes/:id", async () => {
	const mode = await Mode.create({
		name: "mode update test",
		duration: 80,
		temperature: 60,
		spinSpeed: 1200
	});

	const data = {
		name: "updated mode test",
		duration: 90,
		temperature: 70,
		spinSpeed: 1100
	};

	await supertest(app)
		.put("/api/modes/" + mode.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			const newMode = await Mode.findByPk(mode.id)
			expect(newMode).toBeTruthy()
			expect(newMode.name).toBe(data.name)
			expect(newMode.duration).toBe(data.duration)
		})
});


test("PATCH /api/washers/:id", async () => {
	const washer = await Washer.create({
		name: "test update washer",
		hash: "kjkdsjfksjd7sdf",
		model: "test model"
	});

	const data = {
		name: "new test update washer",
		hash: "kjkdsjfksjd7sdf",
		model: "test new model"
	};
	await supertest(app)
		.put("/api/washers/" + washer.id)
		.send(data)
		.expect(200)
		.then(async (response) => {
			const newWasher = await Washer.findByPk(washer.id)
			expect(newWasher).toBeTruthy()
			expect(newWasher.name).toBe(data.name)
			expect(newWasher.model).toBe(data.model)
		})
});
