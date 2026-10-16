const { test, describe } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");
const app = require("../src/app");

// These tests need NO database: they check the parts of the API that answer before any DB query.

describe("Health checks", () => {
  test("GET /health returns 200 and status ok", async () => {
    const res = await request(app).get("/health");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "ok");
  });

  test("GET /health/ready returns 503 when the database is not connected", async () => {
    const res = await request(app).get("/health/ready");
    assert.strictEqual(res.status, 503);
    assert.strictEqual(res.body.database, "disconnected");
  });
});

describe("Routing", () => {
  test("GET / returns the welcome message", async () => {
    const res = await request(app).get("/");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.message, "Task Manager API is running");
  });

  test("An unknown route returns 404", async () => {
    const res = await request(app).get("/does-not-exist");
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.body.message, "Route not found");
  });
});

describe("Security", () => {
  test("GET /api/tasks without a token returns 401", async () => {
    const res = await request(app).get("/api/tasks");
    assert.strictEqual(res.status, 401);
    assert.strictEqual(res.body.message, "Not logged in");
  });

  test("GET /api/users without a token returns 401", async () => {
    const res = await request(app).get("/api/users");
    assert.strictEqual(res.status, 401);
  });
});

describe("Validation", () => {
  test("POST /api/auth/register with missing fields returns 400", async () => {
    const res = await request(app).post("/api/auth/register").send({ email: "a@test.com" });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.body.message, "Name, email and password are required");
  });

  test("POST /api/auth/login with missing fields returns 400", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    assert.strictEqual(res.status, 400);
  });
});