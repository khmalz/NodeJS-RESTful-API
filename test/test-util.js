import { hash } from "bcrypt";
import { prismaClient } from "../src/app/database";

export const removeTestUser = async () => {
   await prismaClient.user.deleteMany({
      where: {
         username: "test",
      },
   });
};

export const createTestUser = async () => {
   await prismaClient.user.create({
      data: {
         username: "test",
         password: await hash("rahasia", 10),
         name: "test",
         token: "test",
      },
   });
};

export const getTestUser = async () => {
   return prismaClient.user.findUnique({
      where: {
         username: "test",
      },
   });
};

export const removeAllContacts = async () => {
   await prismaClient.contact.deleteMany({
      where: {
         username: "test",
      },
   });
};

export const createTestContact = async () => {
   await prismaClient.contact.create({
      data: {
         username: "test",
         first_name: "test",
         last_name: "test",
         email: "test@example.com",
         phone: "0812997182",
      },
   });
};

export const getTestContact = async () => {
   return prismaClient.contact.findFirst({
      where: {
         username: "test",
      },
   });
};

export const createManyTestContacts = async size => {
   for (let i = 0; i < size; i++) {
      await prismaClient.contact.createMany({
         data: {
            username: "test",
            first_name: `test ${i}`,
            last_name: `test ${i}`,
            email: `test${i}@example.com`,
            phone: `0812997182${i}`,
         },
      });
   }
};

export const removeAllAddress = async () => {
   await prismaClient.address.deleteMany({
      where: {
         contact: {
            username: "test",
         },
      },
   });
};

export const createTestAddress = async () => {
   const contact = await getTestContact();

   await prismaClient.address.create({
      data: {
         contact_id: contact.id,
         street: "Jalan test",
         city: "Kota Test",
         province: "Provinsi Test",
         country: "Indonesia",
         postal_code: "291872",
      },
   });
};

export const getTestAddress = async () => {
   return prismaClient.address.findFirst({
      where: {
         contact: {
            username: "test",
         },
      },
   });
};
