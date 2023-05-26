export default defineEventHandler(async (event) => {
  const [rows] = await promisePool.execute(
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
