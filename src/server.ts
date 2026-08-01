import app from "./app";
import config from "./config/appConfig";

app.listen(config.port, () => {
  console.log(`Server started on port: ${config.port}`);
});
