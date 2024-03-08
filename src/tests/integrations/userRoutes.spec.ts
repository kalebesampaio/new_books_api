import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import {
  mockedUser,
  mockedUserAdm,
  mockedUserAdminLogin,
  mockedUserLogin,
} from "../mocks";

describe("Testing User routes", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users -  Must be able to create a user", async () => {
    const response = await request(app).post("/users").send(mockedUser);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("name");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("admin");
    expect(response.body).toHaveProperty("birthday");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.status).toBe(201);
  });

  test("POST /login -  should be able to login a user", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);
    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  test("GET /users -  should be able to search all users", async () => {
    await request(app).post("/users").send(mockedUserAdm);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveLength(2);
  });

  test("GET /users -  should not be able to search all users", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(403);
  });

  test("PATCH /users -  should be able to change user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const userRes = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const userID = userRes.body[0].id;
    const response = await request(app)
      .patch(`/users/${userID}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ name: "New Name" });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("New Name");
    expect(response.body).not.toHaveProperty("password");
  });

  test("DELETE /users -  should be able to delete the user", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserAdminLogin);
    const userRes = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const userID = userRes.body[0].id;
    const response = await request(app)
      .delete(`/users/${userID}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });
});
