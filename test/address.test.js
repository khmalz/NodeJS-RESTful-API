import supertest from "supertest";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllAddress, removeAllContacts, removeTestUser } from "./test-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logging";

describe("POST /api/contacts/:contactId/addresses", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
   });

   afterEach(async () => {
      await removeAllAddress();
      await removeAllContacts();
      await removeTestUser();
   });

   it("should create a new address", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).post(`/api/contacts/${testContact.id}/addresses`).set("Authorization", "test").send({
         street: "Jalan test",
         city: "Kota Test",
         province: "Provinsi Test",
         country: "Indonesia",
         postal_code: "291872",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.street).toBe("Jalan test");
      expect(result.body.data.city).toBe("Kota Test");
      expect(result.body.data.province).toBe("Provinsi Test");
      expect(result.body.data.country).toBe("Indonesia");
      expect(result.body.data.postal_code).toBe("291872");
   });

   it("should reject if address request is invalid", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).post(`/api/contacts/${testContact.id}/addresses`).set("Authorization", "test").send({
         street: "Jalan test",
         city: "Kota Test",
         province: "Provinsi Test",
         country: "",
         postal_code: "",
      });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
   });

   it("should reject if contact is not found", async () => {
      const result = await supertest(web).post(`/api/contacts/01212/addresses`).set("Authorization", "test").send({
         street: "Jalan test",
         city: "Kota Test",
         province: "Provinsi Test",
         country: "",
         postal_code: "",
      });

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
   });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
      await createTestAddress();
   });

   afterEach(async () => {
      await removeAllAddress();
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can get contact", async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web).get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`).set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.street).toBe("Jalan test");
      expect(result.body.data.city).toBe("Kota Test");
      expect(result.body.data.province).toBe("Provinsi Test");
      expect(result.body.data.country).toBe("Indonesia");
      expect(result.body.data.postal_code).toBe("291872");
   });

   it("should reject if contact is not found", async () => {
      const testAddress = await getTestAddress();

      const result = await supertest(web).get(`/api/contacts/019912/addresses/${testAddress.id}`).set("Authorization", "test");

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
   });

   it("should reject if address is not found", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).get(`/api/contacts/${testContact.id}/addresses/01921`).set("Authorization", "test");

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
   });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
      await createTestAddress();
   });

   afterEach(async () => {
      await removeAllAddress();
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can update address", async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web).put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`).set("Authorization", "test").send({
         street: "street",
         city: "city",
         province: "province",
         country: "Indonesia",
         postal_code: "191281",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.street).toBe("street");
      expect(result.body.data.city).toBe("city");
      expect(result.body.data.province).toBe("province");
      expect(result.body.data.country).toBe("Indonesia");
      expect(result.body.data.postal_code).toBe("191281");
   });

   it("should reject if request is not valid", async () => {
      const testContact = await getTestContact();
      const testAddress = await getTestAddress();

      const result = await supertest(web).put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`).set("Authorization", "test").send({
         street: "street",
         city: "city",
         province: "province",
         country: "",
         postal_code: "",
      });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
   });

   it("should reject if contact is not found", async () => {
      const testAddress = await getTestAddress();

      const result = await supertest(web).put(`/api/contacts/019912/addresses/${testAddress.id}`).set("Authorization", "test").send({
         street: "street",
         city: "city",
         province: "province",
         country: "Indonesia",
         postal_code: "191281",
      });

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
   });

   it("should reject if address is not found", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).put(`/api/contacts/${testContact.id}/addresses/01921`).set("Authorization", "test").send({
         street: "street",
         city: "city",
         province: "province",
         country: "Indonesia",
         postal_code: "191281",
      });

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
   });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
   beforeEach(async () => {
      await createTestUser();
      await createTestContact();
      await createTestAddress();
   });

   afterEach(async () => {
      await removeAllAddress();
      await removeAllContacts();
      await removeTestUser();
   });

   it("should can delete address", async () => {
      const testContact = await getTestContact();
      let testAddress = await getTestAddress();

      const result = await supertest(web).delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`).set("Authorization", "test");

      expect(result.status).toBe(200);
      expect(result.body.data).toBe("OK");

      testAddress = await getTestAddress();
      expect(testAddress).toBeNull();
   });

   it("should reject if address is not found", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).delete(`/api/contacts/${testContact.id}/addresses/01921`).set("Authorization", "test");

      expect(result.status).toBe(404);
   });

   it("should reject if contact is not found", async () => {
      let testAddress = await getTestAddress();

      const result = await supertest(web).delete(`/api/contacts/09921/addresses/${testAddress.id}`).set("Authorization", "test");

      expect(result.status).toBe(404);
   });
});
