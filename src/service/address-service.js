import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { createAdressValidation } from "../validation/address-validation";
import { getContactValidation } from "../validation/contact-validaition";
import { validate } from "../validation/validation";

const create = async (user, contactId, request) => {
   contactId = validate(getContactValidation, contactId);

   const totalContact = await prismaClient.contact.count({
      where: {
         username: user.username,
         id: contactId,
      },
   });

   if (totalContact !== 1) {
      throw new ResponseError(404, "Contact is not found");
   }

   const address = validate(createAdressValidation, request);
   address.contact_id = contactId;

   return prismaClient.address.create({
      data: address,
      select: {
         id: true,
         street: true,
         city: true,
         province: true,
         country: true,
         postal_code: true,
      },
   });
};

export default {
   create,
};
