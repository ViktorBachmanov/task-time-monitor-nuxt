export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const [rows, fields] = await promisePool.execute(
    "SELECT * FROM `tasks` WHERE project_id = ?",
    [query["project-id"]]
  );
  return {
    rows,
  };
});
