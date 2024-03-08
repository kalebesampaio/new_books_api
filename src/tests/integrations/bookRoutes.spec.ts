import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { mockedBook, mockedUser, mockedUserLogin } from "../mocks";
import "@types/jest";

describe("Testing Book routes", () => {
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

  test("POST /books -  should be able to create a book", async () => {
    await request(app).post("/users").send(mockedUser);
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .post("/books")
      .send(mockedBook)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("views");
    expect(response.body).toHaveProperty("launched_in");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("genres");
    expect(response.body).toHaveProperty("comments");
    expect(response.body).toHaveProperty("assessments");
    expect(response.status).toBe(201);
  });

  test("GET /books -  should be able to search all books", async () => {
    const response = await request(app).get("/books");
    expect(response.body).toHaveLength(1);
  });

  test("GET /books -  should be able to search for a book", async () => {
    const resBook = await request(app).get("/books");
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const response = await request(app)
      .get(`/books/${resBook.body[0].id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("author");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("views");
    expect(response.body).toHaveProperty("launched_in");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("genres");
    expect(response.body).toHaveProperty("comments");
    expect(response.body).toHaveProperty("assessments");
    expect(response.body.views).toEqual(1);
    expect(response.status).toBe(200);
  });

  test("PATCH /books -  should be able to change book", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const bookRes = await request(app).get("/books");
    const bookID = bookRes.body[0].id;
    const response = await request(app)
      .patch(`/books/${bookID}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send({ status: "Finalizado" });
    expect(response.status).toBe(200);
    expect(response.body.status).toEqual("Finalizado");
  });

  test("DELETE /books -  should be able to delete the book", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedUserLogin);
    const bookRes = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    const bookID = bookRes.body[0].id;
    const response = await request(app)
      .delete(`/books/${bookID}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });
});
