# To-Do API

This is a simple Rest API on a "To-Do" connected to a PostgreSQL database, without ORM and with unit tests (Jest and Supertest).

## Set Up

### Step 1

Download dependencies with: 

```
npm install
```

### Step 2

Create a database and the corresponding table within the PostgreSQL manager.

#### SQL command to create the database:

```
CREATE DATABASE database_name;
```

#### SQL command to create the table:

```
CREATE TABLE table_name (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(255) NOT NULL
);
```

### Step 3

Inside the main project path, create a file for the `.env` environment variables and assign the following values:

```
PORT=3000

PGHOST=localhost
PGUSER=postgres
PGDATABASE=database_name
PGPASSWORD=my_secret_password
PGPORT=5432
```

### Step 4

#### Run local server: 

```
npm run dev
```

#### Run tests:

```
npm run test
```

Remember that some tests depend on there being at least one record in the database table. Therefore, it is recommended that you create the registry directly in postgres or from the api and assign the corresponding *ID* in the unit tests.

##### Unit tests to modify

- GET by ID
- PUT
- DELETE by ID