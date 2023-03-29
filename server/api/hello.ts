import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });
  await connection.execute(
    "INSERT INTO `task` (id, name) VALUES (1, 'Task-1')"
  );
  const [rows, fields] = await connection.execute("SELECT * FROM `task`");
  return {
    api: "works!",
    rows,
    fields,
  };
});
