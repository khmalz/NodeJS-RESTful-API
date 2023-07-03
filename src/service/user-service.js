import { compare, hash } from "bcrypt";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { loginUserValidation, registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import { v4 as uuid } from "uuid";

const register = async request => {
   const user = validate(registerUserValidation, request);

   const countUser = await prismaClient.user.count({
      where: { username: user.username },
   });

   if (countUser === 1) {
      throw new ResponseError(400, "Username already exists");
   }

   user.password = await hash(user.password, 10);

   return prismaClient.user.create({
      data: user,
      select: {
         username: true,
         name: true,
      },
   });
};

const login = async request => {
   const loginRequest = validate(loginUserValidation, request);

   const user = await prismaClient.user.findUnique({
      where: { username: loginRequest.username },
      select: {
         username: true,
         password: true,
      },
   });

   if (!user) {
      throw new ResponseError(401, "Username or password wrong");
   }

   const isPasswordValid = await compare(loginRequest.password, user.password);

   if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password wrong");
   }

   const token = uuid().toString();

   return prismaClient.user.update({
      data: { token },
      where: { username: user.username },
      select: {
         token: true,
      },
   });
};

export default {
   register,
   login,
};
