import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { mockedBook, mockedUser, mockedUserLogin } from "../mocks";
import { describe, expect, test } from "@jest/globals";

describe("Testing Comment routes", () => {
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

  test("POST /books/bookID/comments -  should be able to create a comment", async () => {
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
      .post(`/books/${bookID}/comments`)
      .send({ text: "Muito bom!" })
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("text");
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("id");
    expect(response.body.text).toEqual("Muito bom!");
    expect(response.status).toBe(201);
  });

  test("PATCH /books/comments/id -  should be able to change comment", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .patch(`/books/comments/1`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ text: "Gostei!" });
    expect(response.status).toBe(200);
    expect(response.body.text).toEqual("Gostei!");
  });

  test("DELETE /books/comments/id -  should be able to delete the comment", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .delete(`/books/comments/1`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });
});
