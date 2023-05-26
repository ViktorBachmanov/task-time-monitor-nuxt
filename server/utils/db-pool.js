import * as mysql from "mysql2/promise";

const runtimeConfig = useRuntimeConfig();

// Create the connection pool. The pool-specific settings are the defaults
export const promisePool = mysql.createPool({
  host: runtimeConfig.databaseHost,
  user: runtimeConfig.databaseUser,
  database: runtimeConfig.database,
  password: runtimeConfig.databasePassword,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 70000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
