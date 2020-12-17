const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../../app");
const User = require("../../../models/User");

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});

  const user = {
    name: "Raj",
    username: "raj12",
    password: "iamraj",
    email: "raj@email.com"
  };

  await api
    .post("/api/users")
    .send(user);

});

describe("signin into an account", () => {

  test("with an invalid email", async () => {
    const user = {
      email: "michael@email.com",
      password: "heythere"
    };

    await api
      .post("/api/users/login")
      .send(user)
      .expect(404)
      .expect("Content-Type", /application\/json/);

  });

  test("with an invalid password", async () => {
    const user = {
      email: "raj@email.com",
      password: "heythere"
    };

    await api
      .post("/api/users/login")
      .send(user)
      .expect(401)
      .expect("Content-Type", /application\/json/);

  });
  
  test("with correct credentials", async () => {
    const user = {
      email: "raj@email.com",
      password: "iamraj"
    };

    await api
      .post("/api/users/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

  });
});

afterAll(() => {
  mongoose.connection.close();
});