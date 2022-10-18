# se2022-08-OfficeQueueManager

## Usage

### Client

- in client/se2022-08-oqm run `npm install`, then `npm start`

### Server

- in server/ run `npm install`, then run `node index.js` or `nodemon index.js` if nodemon is installed

## Selected Technologies

### Frontend

- React **18.2.0**
- MUI **5.10.9**

### Backend

- NodeJS **16.18**
- Sqlite3 **5.1.2**
- express **4.18.2**
- passport **0.6.0**

### Testing

- Mocha
- Jest

## React Client Application Routes

- Route `/` : _brief description_
- Route `/login` : _brief description_

## API Server

### Authentication

- POST `/api/sessions`

  - Description: Login
  - Request body: _TBC_

  ```
  {
      "username": "_TBC_",
      "password": "_TBC_"
  }
  ```

  - Response: `200 OK` (success)
  - Error responses: `401 Unauthorized` (wrong username and/or password) or `500 Internal Server Error` (generic error)
  - Response body: _to _

  ```
  {
      _TBC_
  }
  ```

- DELETE `/api/sessions/current`

  - Description: Logout
  - Request body: _None_
  - Response: `204 No Content` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: _TBC_

### Counter

- GET `/api/counters`

  - Description: Return an array containing all counters
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all counters and their managers, or an error message in case of failure

  ```
  [
    ...,
    {
      "ID_Counter": 2,
      "ID_Manager": 2
    },
    ...
  ]
  ```

- POST `/api/counter`

  - Description: Create a new counter
  - Permissions allowed: Manager
  - Request body: Manager ID for the new counter

  ```
  {
      "ID_Manager": 1
  }
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `404 Not Found` (Manager not found), `422 Unprocessable Entity` (validation of request body failed) or `500 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- DELETE `/api/counters/:id`

  - Description: Delete a counter receiving its id
  - Permissions allowed: Manager
  - Request header: req.params.id to retrieve id
  - Request body: _None_
  - Response: `204 No Content` (success)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of id failed) or `500 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

### Service

- GET `/api/services`

  - Description: Return an array containing all services
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: An array of objects, containing all services with the description, the avarage time and the manager, or an error message in case of failure

  ```
  [
    ...,
    {
      "idS": 1,
      "description": "something",
      "avarageTime": 10,
      "idM": 1,
    },
    ...
  ]
  ```

- POST `/api/service`

  - Description: Create a new service
  - Permissions allowed: Manager
  - Request body: Description and the avarage time of the service

  ```
  {
      "description": "something",
      "avarageTime": 10,
  }
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed) or `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

- DELETE `/api/service/:id`

  - Description: Delete a service receiving its id
  - Permissions allowed: Manager
  - Request header: req.params.id to retrieve id
  - Request body: _None_
  - Response: `204 No Content` (success)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of id failed) or `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

### Tickets
- GET `/api/ticket/:serviceId`

  - Description: Return estimated waiting time for a specific service
  - Request body: _None_
  - Response: `200 OK` (success)
  - Error responses: `500 Internal Server Error` (generic error)
  - Response body: Estimated waiting time in mm:ss format

  ```
  {
    "time": "10:20"
  }
  ```

- POST `/api/ticket`

  - Description: Create a new ticket
  - Permissions allowed: Manager, Officer
  - Request body: Service ID

  ```
  {
      "serviceID": 10
  }
  ```

  - Response: `201 OK` (Created)
  - Error responses: `401 Unauthorized` (not logged in or wrong permissions), `422 Unprocessable Entity` (validation of request body failed) or `503 Internal Server Error` (generic error)
  - Response body: An error message in case of failure

  ```
  {
      "error": "message text"
  }
  ```

## Database Tables

- Table `Manager` - contains ID_Manager(primary key) nameM, surnameM, email, password, salt
- Table `Counter` - contains ID_Counter(primary key), ID_Manager(foreign key)
- Table `Service` - contains ID_Service(primary key), description, avarage_time, ID_Manager(foreign key)
- Table `Job` - contains ID_Job(primary key), ID_Manager(foreign key), ID_Counter(foreign key), ID_Service(foreign key)
- Table `Ticket` - contains ID_Ticket(primary key), status, numTicket, ID_Service(foreign key)

### Notes

- There is already a Manager inside the table
  - email: mariorossi@po.it, password: password
- The status of the table called Ticket can be open/close
- All the primary key are autoincrement