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
      dateFrom = createMonthDate("April");
      dateTo = createMonthDate("May");
      break;
    case "may":
      dateFrom = createMonthDate("May");
      dateTo = createMonthDate("June");
      break;
    case "june":
      dateFrom = createMonthDate("June");
      dateTo = createMonthDate("July");
      break;
    case "july":
      dateFrom = createMonthDate("July");
      dateTo = createMonthDate("August");
      break;
    case "august":
      dateFrom = createMonthDate("August");
      dateTo = createMonthDate("September");
      break;
    case "september":
      dateFrom = createMonthDate("September");
      dateTo = createMonthDate("October");
      break;
    case "october":
      dateFrom = createMonthDate("October");
      dateTo = createMonthDate("November");
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

//=================== helper functions ==================

function createMonthDate(month) {
  return new Date(`${month} 1, 2023`).toISOString().split("T")[0];
}
