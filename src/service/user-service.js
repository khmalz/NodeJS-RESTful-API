import { hash } from "bcrypt";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";

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

export default {
   register,
};
