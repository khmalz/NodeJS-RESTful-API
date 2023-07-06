import { prismaClient } from "../app/database";

export const authMiddleware = async (req, res, next) => {
   const token = req.get("Authorization");

   if (!token) return res.status(401).json({ errors: "Unauthorized" });

   const user = await prismaClient.user.findFirst({
      where: {
         token,
      },
   });

   if (!user) return res.status(401).json({ errors: "Unauthorized" });

   req.user = user;
   next();
};
