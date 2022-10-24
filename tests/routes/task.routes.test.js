import request from "supertest";
import app from "../../src/app.js";
import pool from "../../src/database/pg-connection.database.js";
import statusCodes from "../../src/utilities/statusCodes.utility.js";

describe("ENDPOINT -> /api/v1/tasks", () => {
  const endPoint = "/api/v1/tasks";
  describe("GET", () => {
    it("should respond with status code 200", async () => {
      const response = await request(app).get(endPoint).send();
      expect(response.statusCode).toBe(statusCodes.OK);
    });

    it("should respond with an array", async () => {
      const response = await request(app).get(endPoint).send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET by ID", () => {
    const endPointWithId = (idMocked) => `${endPoint}/${idMocked}`;
    it("should respond with status code 200", async () => {
      const idMocked = 6;
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(response.statusCode).toBe(statusCodes.OK);
    });

    it("should respond with an object", async () => {
      const idMocked = 6;
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(typeof response.body).toBe("object");
    });

    it("should respond with status code 404 when the task ID does not exist", async () => {
      const idMocked = 75;
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(response.statusCode).toBe(statusCodes.NOT_FOUND);
    });

    it("should respond with status code 400 when the task ID is not a number", async () => {
      const idMocked = "hi";
      const response = await request(app).get(endPointWithId(idMocked)).send();
      expect(response.status).toBe(statusCodes.BAD_REQUEST);
    });
  });

  describe("POST", () => {
    it("should respond with status code 201", async () => {
      const taskMocked = {
        name: "Wash the dishes",
        description: "I must wash the dishes before 6 pm",
      };
      const response = await request(app).post(endPoint).send(taskMocked);
      expect(response.statusCode).toBe(statusCodes.CREATED);
    });

    it("should respond with status 400 when any type of task value is wrong", async () => {
      const taskMocked1 = {
        name: 5,
        description: "Task is wrong",
      };
      const taskMocked2 = {
        name: "Do the laundry",
        description: 54,
      };
      const response1 = await request(app).post(endPoint).send(taskMocked1);
      const response2 = await request(app).post(endPoint).send(taskMocked2);
      expect(response1.statusCode).toBe(statusCodes.BAD_REQUEST);
      expect(response2.statusCode).toBe(statusCodes.BAD_REQUEST);
    });
  });

  describe("PUT", () => {
    const endPointWithId = (idMocked) => `${endPoint}/${idMocked}`;
    it("should respond with status code 200", async () => {
      const idMocked = 8;
      const taskMocked = {
        name: "Task updated",
        description: "To do something...",
      };
      const response = await request(app)
        .put(endPointWithId(idMocked))
        .send(taskMocked);
      expect(response.statusCode).toBe(statusCodes.OK);
    });

    it("should respond with status code 404 when the task ID does not exist", async () => {
      const idMocked = 54;
      const taskMocked = {
        name: "Task updated",
        description: "To do something...",
      };
      const response = await request(app)
        .put(endPointWithId(idMocked))
        .send(taskMocked);
      expect(response.statusCode).toBe(statusCodes.NOT_FOUND);
    });

    it("should respond with status 400 when any type of task value is wrong", async () => {
      const idMocked = 8;
      const taskMocked1 = {
        name: 5,
        description: "Task is wrong",
      };
      const taskMocked2 = {
        name: "Do the laundry",
        description: 54,
      };
      const response1 = await request(app)
        .put(endPointWithId(idMocked))
        .send(taskMocked1);
      const response2 = await request(app)
        .put(endPointWithId(idMocked))
        .send(taskMocked2);
      expect(response1.statusCode).toBe(statusCodes.BAD_REQUEST);
      expect(response2.statusCode).toBe(statusCodes.BAD_REQUEST);
    });
  });

  describe("DELETE by ID", () => {
    const endPointWithId = (idMocked) => `${endPoint}/${idMocked}`;
    it("should respond with status code 204", async () => {
      const idMocked = 13;
      const response = await request(app)
        .delete(endPointWithId(idMocked))
        .send();
      expect(response.statusCode).toBe(statusCodes.NO_CONTENT);
    });

    it("should respond with status code 404 when the task ID does not exist", async () => {
      const idMocked = 54;
      const response = await request(app)
        .delete(endPointWithId(idMocked))
        .send();
      expect(response.statusCode).toBe(statusCodes.NOT_FOUND);
    });

    it("should respond with status code 400 when the type of task ID is wrong", async () => {
      const idMocked = "hi";
      const response = await request(app)
        .delete(endPointWithId(idMocked))
        .send();
      expect(response.statusCode).toBe(statusCodes.BAD_REQUEST);
    });
  });
});

afterAll(() => pool.end());
