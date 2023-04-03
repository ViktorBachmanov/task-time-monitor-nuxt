import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const currentSessionId = body.currentSessionId;

  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });

  const [currentSession] = await connection.execute(
    "SELECT created_at FROM sessions WHERE id = ?",
    [currentSessionId]
  );

  // console.log()

  const [result] = await connection.execute(
    `UPDATE sessions SET closed_at = CURRENT_TIMESTAMP(), seconds = TIMESTAMPDIFF(SECOND, ?, CURRENT_TIMESTAMP()) WHERE id = ?`,
    [currentSession[0].created_at, currentSessionId]
  );

  const [rows] = await connection.execute(
    // "SELECT * FROM `sessions` WHERE id = ?",
    `SELECT sessions.id AS id, created_at, closed_at, seconds, tasks.name AS task_name 
      FROM sessions, tasks WHERE task_id = tasks.id AND sessions.id = ?`,
    [currentSessionId]
  );

  return {
    session: rows[0],
  };
});
