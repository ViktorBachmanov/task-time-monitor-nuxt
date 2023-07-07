export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  let dateFrom, dateTo;

  switch (query["period"]) {
    case "today":
      dateFrom = new Date().toISOString().split("T")[0];
      dateTo = new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      break;
    case "april":
      dateFrom = new Date("April 1, 2023").toISOString().split("T")[0];
      dateTo = new Date("May 1, 2023").toISOString().split("T")[0];
      break;
    case "may":
      dateFrom = new Date("May 1, 2023").toISOString().split("T")[0];
      dateTo = new Date("June 1, 2023").toISOString().split("T")[0];
      break;
    case "april-may":
      dateFrom = new Date("April 1, 2023").toISOString().split("T")[0];
      dateTo = new Date("June 1, 2023").toISOString().split("T")[0];
      break;
    case "june":
      dateFrom = new Date("June 1, 2023").toISOString().split("T")[0];
      dateTo = new Date("July 1, 2023").toISOString().split("T")[0];
      break;
    case "july":
      dateFrom = new Date("July 1, 2023").toISOString().split("T")[0];
      dateTo = new Date("August 1, 2023").toISOString().split("T")[0];
      break;
  }

  const [rows] = await promisePool.execute(
    `SELECT sessions.id AS id, created_at, updated_at, seconds, task_id, tasks.name AS task_name, projects.name AS project_name, projects.id AS project_id
     FROM sessions, tasks, projects 
     WHERE task_id = tasks.id 
     AND tasks.project_id = projects.id
     AND created_at BETWEEN ? AND ?
     ORDER BY sessions.id DESC`,
    [dateFrom, dateTo]
  );
  return {
    rows,
  };
});
