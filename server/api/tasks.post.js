import * as mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newTaskName = body.itemName;
  const projectId = body.projectId;

  const runtimeConfig = useRuntimeConfig();

  const connection = await mysql.createConnection({
    host: runtimeConfig.databaseHost,
    user: runtimeConfig.databaseUser,
    password: runtimeConfig.databasePassword,
    database: runtimeConfig.database,
  });

  const [result] = await connection.execute(
    "INSERT INTO `tasks` (name, project_id) VALUES (?, ?)",
    [newTaskName, projectId]
  );

  const [rows, fields] = await connection.execute(
    "SELECT * FROM `tasks` WHERE id = LAST_INSERT_ID()"
  );

  return {
    createdItem: rows[0],
  };
});
