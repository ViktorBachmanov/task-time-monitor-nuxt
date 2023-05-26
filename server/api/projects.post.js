export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newProjectName = body.itemName;

  const [result] = await promisePool.execute(
    "INSERT INTO `projects` (name) VALUES (?)",
    [newProjectName]
  );

  const [rows, fields] = await promisePool.execute(
    "SELECT * FROM `projects` WHERE id = LAST_INSERT_ID()"
  );

  return {
    createdItem: rows[0],
  };
});
