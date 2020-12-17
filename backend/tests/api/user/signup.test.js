const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../../../models/User");

const app = require("../../../app");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany();
});

describe("create an account", () => {

  test("without an email", async () => {

    const user = {
      name: "Raj",
      username: "raj12",
      password: "iamraj"
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(400);
  });

  test("without a name", async () => {

    const user = {
      email: "raj@email.com",
      username: "raj12",
      password: "iamraj"
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(400);
  });

  test("without password", async () => {
    const user = {
      name: "Raj",
      email: "raj@email.com",
      username: "raj12",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(400);
  });

  test("with the same email", async () => {

    // Create a user
    const user = {
      name: "Raj",
      email: "raj@email.com",
      password: "iamraj",
      username: "raj12"
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(201);

    // Create another user with the same email
    const newUser = {
      name: "Vikram",
      username: "vikr12",
      email: "raj@email.com",
      password: "iamvikram",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);

  });

  test("with the same username", async () => {

    // Create a user
    const user = {
      name: "Raj",
      email: "raj@email.com",
      password: "iamraj",
      username: "raj12"
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(201);

    // Create another user with the same username
    const newUser = {
      name: "Vikram",
      username: "raj12",
      email: "raj@email.com",
      password: "iamvikram",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400);

  });

});

afterAll(() => {
  mongoose.connection.close();
});