export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const currentTaskId = body.currentTaskId;

  const [result] = await promisePool.execute(
    "INSERT INTO `sessions` (task_id) VALUES (?)",
    [currentTaskId]
  );

  const [rows] = await promisePool.execute(
    "SELECT * FROM `sessions` WHERE id = ?",
    [result.insertId]
  );

  return {
    session: rows[0],
  };
});
