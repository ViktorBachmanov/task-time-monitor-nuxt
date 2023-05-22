import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newProjectName = body.itemName;

  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });

  const [result] = await connection.execute(
    "INSERT INTO `projects` (name) VALUES (?)",
    [newProjectName]
  );

  const [rows, fields] = await connection.execute(
    "SELECT * FROM `projects` WHERE id = LAST_INSERT_ID()"
  );

  return {
    createdTask: rows[0],
  };
});
