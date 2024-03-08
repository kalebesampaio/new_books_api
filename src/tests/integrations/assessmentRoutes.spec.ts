import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { mockedBook, mockedUser, mockedUserLogin } from "../mocks";
import { describe, expect, test } from "@jest/globals";

describe("Testing Assessment routes", () => {
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

  test("POST /books/bookID/assessments -  should be able to create a assessment", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const resBook = await request(app)
      .post("/books")
      .send(mockedBook)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const bookID = resBook.body.id;
    const response = await request(app)
      .post(`/books/${bookID}/assessments`)
      .send({ rating: 5 })
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("rating");
    expect(response.body).toHaveProperty("id");
    expect(response.body.rating).toEqual(5);
    expect(response.status).toBe(201);
  });

  test("PATCH /books/assessments/id -  should be able to change assessment", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .patch(`/books/assessments/1`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ rating: 2 });
    expect(response.status).toBe(200);
    expect(response.body.rating).toEqual(2);
  });

  test("DELETE /books/assessments/id -  should be able to delete the assessment", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .delete(`/books/assessments/1`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });
});
