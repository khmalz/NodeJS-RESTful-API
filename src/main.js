import { web } from "./app/web";
import { logger } from "./app/logging";

web.listen(300, () => {
   logger.info("App Start");
});
