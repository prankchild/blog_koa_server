import app from "./app";
import { PORT } from "./config";
app.listen(PORT, () => {
  console.log(`server is running on http://127.0.0.1:${PORT}`);
});
