import { prismaClient } from "../app/database";

export const authMiddleware = async (req, res, next) => {
   const token = req.get("Authorization");
   if (!token) {
      return res.status(401).json({ errors: "Unathorized" });
   } else {
      const user = await prismaClient.user.findFirst({
         where: {
            token,
         },
      });
      if (!user) {
         return res.status(401).json({ errors: "Unathorized" });
      } else {
         req.user = user;
         next();
      }
   }
};
