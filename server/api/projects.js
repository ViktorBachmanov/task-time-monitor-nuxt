export default defineEventHandler(async (event) => {
  const [rows, fields] = await promisePool.execute("SELECT * FROM `projects`");
  return rows;
});
