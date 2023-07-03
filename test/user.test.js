import supertest from "supertest";
import { web } from "../src/app/web";
import { prismaClient } from "../src/app/database";
import { logger } from "../src/app/logging";

describe("POST /api/users", function () {
   afterEach(async () => {
      await prismaClient.user.deleteMany({
         where: {
            username: "kmlz",
         },
      });
   });

   it("should can register new user", async () => {
      const result = await supertest(web).post("/api/users").send({
         username: "kmlz",
         password: "rahasia",
         name: "Khairul Akmal",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("kmlz");
      expect(result.body.data.name).toBe("Khairul Akmal");
      expect(result.body.data.password).toBeUndefined();
   });

   it("should reject if request is invalid", async () => {
      const result = await supertest(web).post("/api/users").send({
         username: "",
         password: "",
         name: "",
      });

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
   });

   it("should reject if username already registered", async () => {
      let result = await supertest(web).post("/api/users").send({
         username: "kmlz",
         password: "rahasia",
         name: "Khairul Akmal",
      });

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.username).toBe("kmlz");
      expect(result.body.data.name).toBe("Khairul Akmal");
      expect(result.body.data.password).toBeUndefined();

      result = await supertest(web).post("/api/users").send({
         username: "kmlz",
         password: "rahasia",
         name: "Khairul Akmal",
      });

      logger.info(result.body);

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
   });
});
