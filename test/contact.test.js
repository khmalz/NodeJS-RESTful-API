import supertest from "supertest";
import { createTestUser, removeAllContacts, removeTestUser } from "./test-util";
import { web } from "../src/app/web";

describe("POST /api/contacts", () => {
   beforeEach(async () => {
      await createTestUser();
   });

   afterEach(async () => {
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can create new contact", async () => {
      const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
         first_name: "test",
         last_name: "test",
         email: "test@example.com",
         phone: "087128991211",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.first_name).toBe("test");
      expect(result.body.data.last_name).toBe("test");
      expect(result.body.data.email).toBe("test@example.com");
      expect(result.body.data.phone).toBe("087128991211");
   });

   it("should reject if request is not valid", async () => {
      const result = await supertest(web).post("/api/contacts").set("Authorization", "test").send({
         first_name: "",
         last_name: "test",
         email: "test@example.com",
         phone: "0871289912111001029919291291929121299121921",
      });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
   });
});
