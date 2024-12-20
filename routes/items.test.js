process.env.NODE_ENV = "test";
const request = require("supertest");
// app imports
const app = require("../app");

let items = require("../fakeDb")

let item = { name: "Rod", price: 200 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});
// end afterEach

describe("GET /items", async function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});


describe("GET /items/:name", async function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /items", async function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Taco",
        price: 0
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toHaveProperty("name");
    expect(response.body.item).toHaveProperty("price");
    expect(response.body.item.name).toEqual("Taco");
    expect(response.body.item.price).toEqual(0);
  });
});


describe("PATCH /items/:name", async function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Troll"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual({
      name: "Troll"
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", async function () {
  test("Deletes a single a item", async function () {
    const response = await request(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});


// TEST CODES FOR THE SECOND VERSION OF THE ITEMS CODES


// beforeEach(() => {
//   items.push({ name: "popsicle", price: 1.45 });
// });

// afterEach(() => {
//   items.length = 0;
// });

// describe("GET /items", () => {
//   test("Get all items", async () => {
//     const res = await request(app).get("/items");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
//   });
// });

// describe("POST /items", () => {
//   test("Add an item", async () => {
//     const res = await request(app).post("/items").send({ name: "cheerios", price: 3.4 });
//     expect(res.statusCode).toBe(201);
//     expect(res.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
//     expect(items).toContainEqual({ name: "cheerios", price: 3.4 });
//   });
// });

// describe("GET /items/:name", () => {
//   test("Get a single item", async () => {
//     const res = await request(app).get("/items/popsicle");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
//   });

//   test("Responds with 404 if item not found", async () => {
//     const res = await request(app).get("/items/notfound");
//     expect(res.statusCode).toBe(404);
//   });
// });

// describe("PATCH /items/:name", () => {
//   test("Update an item", async () => {
//     const res = await request(app).patch("/items/popsicle").send({ name: "new popsicle", price: 2.45 });
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ updated: { name: "new popsicle", price: 2.45 } });
//   });

//   test("Responds with 404 if item not found", async () => {
//     const res = await request(app).patch("/items/notfound").send({ name: "nothing" });
//     expect(res.statusCode).toBe(404);
//   });
// });

// describe("DELETE /items/:name", () => {
//   test("Delete an item", async () => {
//     const res = await request(app).delete("/items/popsicle");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ message: "Deleted" });
//     expect(items).toEqual([]);
//   });

//   test("Responds with 404 if item not found", async () => {
//     const res = await request(app).delete("/items/notfound");
//     expect(res.statusCode).toBe(404);
//   });
// });

