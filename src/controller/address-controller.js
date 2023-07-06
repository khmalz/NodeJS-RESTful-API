import addressService from "../service/address-service";

const create = async (req, res, next) => {
   try {
      const user = req.user;
      const request = req.body;
      const { contactId } = req.params;

      const result = await addressService.create(user, contactId, request);

      res.status(200).json({
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const get = async (req, res, next) => {
   try {
      const user = req.user;
      const { contactId, addressId } = req.params;

      const result = await addressService.get(user, contactId, addressId);

      res.status(200).json({
         data: result,
      });
   } catch (e) {
      next(e);
   }
};

const update = async (req, res, next) => {
   try {
      const user = req.user;
      const { contactId, addressId } = req.params;
      const request = req.body;
      request.id = addressId;

      const result = await addressService.update(user, contactId, request);

      res.status(200).json({
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

const remove = async (req, res, next) => {
   try {
      const user = req.user;
      const { contactId, addressId } = req.params;

      await addressService.remove(user, contactId, addressId);

      res.status(200).json({
         data: "OK",
      });
   } catch (error) {
      next(error);
   }
};

const list = async (req, res, next) => {
   try {
      const user = req.user;
      const { contactId } = req.params;

      const result = await addressService.list(user, contactId);

      res.status(200).json({
         data: result,
      });
   } catch (error) {
      next(error);
   }
};

export default {
   create,
   get,
   update,
   remove,
   list,
};
