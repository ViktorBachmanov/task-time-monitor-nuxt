export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newTaskName = body.itemName;
  const projectId = body.projectId;

  const [result] = await promisePool.execute(
    "INSERT INTO `tasks` (name, project_id) VALUES (?, ?)",
    [newTaskName, projectId]
  );

  const [rows, fields] = await promisePool.execute(
    "SELECT * FROM `tasks` WHERE id = LAST_INSERT_ID()"
  );

  return {
    createdItem: rows[0],
  };
});
