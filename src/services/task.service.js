import pool from "../database/pg-connection.database.js";
import statusCodes from "../utilities/statusCodes.utility.js";

const queries = {
  SELECT_ALL: "SELECT * FROM tasks",
  SELECT_BY_ID: "SELECT * FROM tasks WHERE id = $1",
  SELECT_COUNT_BY_ID: "SELECT COUNT(*) FROM tasks WHERE id = $1",
  INSERT: "INSERT INTO tasks(name, description) VALUES($1, $2)",
  UPDATE: "UPDATE tasks SET name = $2, description = $3 WHERE id = $1",
  DELETE: "DELETE FROM tasks WHERE id = $1",
};

async function checkExists(data) {
  const { rows } = await pool.query(queries.SELECT_COUNT_BY_ID, data);
  return rows[0].count === "1";
}

function checkIsANumber(value) {
  if (value === "") return false;
  return !isNaN(Number(value));
}

function checkIfDataIsWrong(data) {
  const filterData = data.filter((element) => typeof element === "number");
  return filterData.length >= 1;
}

export const getAll = async () => {
  const response = await pool.query(queries.SELECT_ALL);
  return response.rows;
};

export const getById = async (data) => {
  if (!checkIsANumber(data[0])) return { status: statusCodes.BAD_REQUEST };

  const existence = await checkExists(data);
  if (!existence) return { status: statusCodes.NOT_FOUND };

  const { rows } = await pool.query(queries.SELECT_BY_ID, data);
  return { task: rows[0], status: statusCodes.OK };
};

export const create = async (data) => {
  if (checkIfDataIsWrong(data)) return { status: statusCodes.BAD_REQUEST };

  await pool.query(queries.INSERT, data);
  return { status: statusCodes.CREATED };
};

export const update = async (data) => {
  if (checkIfDataIsWrong(data)) return { status: statusCodes.BAD_REQUEST };

  const existence = await checkExists([data[0]]);
  if (!existence) return { status: statusCodes.NOT_FOUND };

  await pool.query(queries.UPDATE, data);
  return { status: statusCodes.OK };
};

export const deleteById = async (data) => {
  if (!checkIsANumber(data[0])) return { status: statusCodes.BAD_REQUEST };

  const existence = await checkExists(data);
  if (!existence) return { status: statusCodes.NOT_FOUND };

  await pool.query(queries.DELETE, data);
  return { status: statusCodes.NO_CONTENT };
};
