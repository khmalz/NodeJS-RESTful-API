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
