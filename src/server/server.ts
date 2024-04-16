import app from "./app.js";

const { DB_HOST, PORT = 8888 } = process.env;

app.listen(PORT, () => {
  console.log(`Server succesfully running on ${PORT} Port`);
});
