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
    "UPDATE sessions SET closed_at = CURRENT_TIMESTAMP(), duration = NOW() - ? WHERE id = ?",
    [currentSession[0].created_at, currentSessionId]
  );

  const [rows] = await connection.execute(
    "SELECT * FROM `sessions` WHERE id = ?",
    [currentSessionId]
  );

  return {
    session: rows[0],
  };
});
