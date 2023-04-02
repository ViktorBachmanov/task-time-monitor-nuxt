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

  const [result] = await connection.execute(
    "UPDATE sessions SET closed_at = CURRENT_TIMESTAMP() WHERE id = ?",
    [currentSessionId]
  );

  return result;
});
