import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, PORT = 8888 } = process.env;

mongoose
  .connect(DB_HOST as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server succesfully running on ${PORT} Port`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
