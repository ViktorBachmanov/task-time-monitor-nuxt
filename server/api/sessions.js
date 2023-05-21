import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });

  const [rows] = await connection.execute(
    `SELECT sessions.id AS id, created_at, updated_at, seconds, task_id, tasks.name AS task_name 
     FROM sessions, tasks 
     WHERE task_id = tasks.id 
     AND created_at > CURDATE()
     ORDER BY sessions.id DESC`
  );
  return {
    rows,
  };
});
