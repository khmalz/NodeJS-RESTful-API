import supertest from "supertest";
import { createManyTestContacts, createTestContact, createTestUser, getTestContact, removeAllContacts, removeTestUser } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

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

describe("GET /api/contacts/:contactId", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
   });

   afterEach(async () => {
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can get contact", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).get(`/api/contacts/${testContact.id}`).set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testContact.id);
      expect(result.body.data.first_name).toBe(testContact.first_name);
      expect(result.body.data.last_name).toBe(testContact.last_name);
      expect(result.body.data.email).toBe(testContact.email);
      expect(result.body.data.phone).toBe(testContact.phone);
   });

   it("should return 404 if contact id is not found", async () => {
      const result = await supertest(web).get(`/api/contacts/019219129`).set("Authorization", "test");

      expect(result.status).toBe(404);
   });
});

describe("PUT /api/contacts/:contactId", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
   });

   afterEach(async () => {
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can update existing contact", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).put(`/api/contacts/${testContact.id}`).set("Authorization", "test").send({
         first_name: "Khairul",
         last_name: "Akmal",
         email: "malz@example.com",
         phone: "08951211912",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testContact.id);
      expect(result.body.data.first_name).toBe("Khairul");
      expect(result.body.data.last_name).toBe("Akmal");
      expect(result.body.data.email).toBe("malz@example.com");
      expect(result.body.data.phone).toBe("08951211912");
   });

   it("should reject if request is invalid", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).put(`/api/contacts/${testContact.id}`).set("Authorization", "test").send({
         first_name: "",
         last_name: "",
         email: "malz",
         phone: "",
      });

      expect(result.status).toBe(400);
   });

   it("should reject if contact is not found", async () => {
      const result = await supertest(web).put(`/api/contacts/0192129`).set("Authorization", "test").send({
         first_name: "Khairul",
         last_name: "Akmal",
         email: "malz@example.com",
         phone: "08951211912",
      });

      expect(result.status).toBe(404);
   });
});

describe("DELETE /api/contacts/:contactId", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
   });

   afterEach(async () => {
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can delete contact", async () => {
      let testContact = await getTestContact();
      const result = await supertest(web).delete(`/api/contacts/${testContact.id}`).set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data).toBe("OK");

      testContact = await getTestContact();
      expect(testContact).toBeNull();
   });

   it("should reject if contact is not found ", async () => {
      const result = await supertest(web).delete(`/api/contacts/091921292`).set("Authorization", "test");

      expect(result.status).toBe(404);
   });
});

describe("GET /api/contacts", () => {
   beforeEach(async () => {
      await createTestUser();
      await createManyTestContacts(15);
   });

   afterEach(async () => {
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can search without parameter", async () => {
      const result = await supertest(web).get("/api/contacts").set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
   });

   it("should can search to page 2", async () => {
      const result = await supertest(web).get("/api/contacts").set("Authorization", "test").query({
         page: 2,
      });

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(5);
      expect(result.body.paging.page).toBe(2);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
   });

   it("should can search to using name", async () => {
      const result = await supertest(web).get("/api/contacts").set("Authorization", "test").query({
         name: "test 1",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
   });

   it("should can search to using email", async () => {
      const result = await supertest(web).get("/api/contacts").set("Authorization", "test").query({
         email: "test1",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
   });

   it("should can search to using phone", async () => {
      const result = await supertest(web).get("/api/contacts").set("Authorization", "test").query({
         phone: "08129971821",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(6);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(1);
      expect(result.body.paging.total_item).toBe(6);
   });
});
