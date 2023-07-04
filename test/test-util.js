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
