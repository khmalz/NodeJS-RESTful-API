import supertest from "supertest";
import { createTestContact, createTestUser, getTestContact, removeAllAddress, removeAllContacts, removeTestUser } from "./test-util";
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
         street: "Jalan street",
         city: "Kota Test",
         province: "Provinsi Test",
         country: "Indonesia",
         postal_code: "291872",
      });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.street).toBe("Jalan street");
      expect(result.body.data.city).toBe("Kota Test");
      expect(result.body.data.province).toBe("Provinsi Test");
      expect(result.body.data.country).toBe("Indonesia");
      expect(result.body.data.postal_code).toBe("291872");
   });

   it("should reject if address request is invalid", async () => {
      const testContact = await getTestContact();

      const result = await supertest(web).post(`/api/contacts/${testContact.id}/addresses`).set("Authorization", "test").send({
         street: "Jalan street",
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
         street: "Jalan street",
         city: "Kota Test",
         province: "Provinsi Test",
         country: "",
         postal_code: "",
      });

      expect(result.status).toBe(404);
      expect(result.body.errors).toBeDefined();
   });
});
