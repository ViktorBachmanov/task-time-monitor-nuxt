import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const currentTaskId = body.currentTaskId;

  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });

  const [result] = await connection.execute(
    "INSERT INTO `sessions` (task_id) VALUES (?)",
    [currentTaskId]
  );

  const [rows] = await connection.execute(
    "SELECT * FROM `sessions` WHERE id = ?",
    [result.insertId]
  );

  return {
    result,
    session: rows[0],
  };
});
