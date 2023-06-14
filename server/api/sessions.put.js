export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const currentSessionId = body.currentSessionId;

  const [currentSession] = await promisePool.execute(
    "SELECT created_at FROM sessions WHERE id = ?",
    [currentSessionId]
  );

  const [result] = await promisePool.execute(
    `UPDATE sessions SET updated_at = CURRENT_TIMESTAMP(), seconds = TIMESTAMPDIFF(SECOND, ?, CURRENT_TIMESTAMP()) WHERE id = ?`,
    [currentSession[0].created_at, currentSessionId]
  );

  const [rows] = await promisePool.execute(
    `SELECT sessions.id AS id, created_at, updated_at, seconds, tasks.name AS task_name 
      FROM sessions, tasks WHERE task_id = tasks.id AND sessions.id = ?`,
    [currentSessionId]
  );

  return {
    session: rows[0],
  };
});
