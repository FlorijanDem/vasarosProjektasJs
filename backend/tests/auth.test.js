const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const authController = require("../controllers/authController");
const authModel = require("../models/authModel");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/signup", authController.signup);
app.post("/login", authController.login);
app.get("/logout", authController.logout);

process.env.JWT_SECRET = "testsecret";
process.env.JWT_EXPIRES_IN = "1d";
process.env.JWT_COOKIE_EXPIRES_IN = "1";

jest.mock("../models/authModel");

describe("Auth Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("Signup should return 201 and set cookie", async () => {
        const user = { email: "test@example.com", password: "qwerty123456" };

        authModel.createUser.mockResolvedValue({ ...user, id: 1 })

        const res = await request(app)
            .post("/signup")
            .send(user)
            .expect(201);

        expect(res.body.status).toBe("success");
        expect(res.headers["set-cookie"]).toBeDefined();
        expect(authModel.createUser).toHaveBeenCalled();
    })

    test("Login should return 200 and set cookie", async () => {
        const user = { email: "test@example.com", password: "qwerty123456" };

        authModel.getUserByEmail.mockResolvedValue({
            ...user,
            id: 1,
            password: await require("argon2").hash("qwerty123456"),
        });

        const res = await request(app)
            .post("/login")
            .send(user)
            .expect(200);

        expect(res.body.status).toBe("success");
        expect(res.headers["set-cookie"]).toBeDefined();

    })

    test("Logout should clear cookie", async () => {
        const res = await request(app).get("/logout").expect(200);

        expect(res.headers["set-cookie"][0]).toContain("jwt=;");
    })
})
