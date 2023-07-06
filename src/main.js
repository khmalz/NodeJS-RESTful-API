import { web } from "./app/web";
import { logger } from "./app/logging";

web.listen(3000, () => {
   logger.info("App Start");
});
