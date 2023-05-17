import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });

  const [rows, fields] = await connection.execute("SELECT * FROM `projects`");
  return {
    rows,
  };
});
