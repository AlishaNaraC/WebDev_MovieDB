# Dramaku: A Drama Rating and Preview Application

**Dramaku** is a web application that allows users to explore and filter dramas by attributes such as country, year, genre, status, availability, and awards. Built with **React** for the frontend and **Express** with **PostgreSQL** for the backend, it offers a seamless user experience with robust data handling.

---

## Features

- **Search Functionality**: Users can search for dramas by title or keywords.
- **Dynamic Filtering**: Filter dramas based on multiple criteria (country, year, genre, status, availability, awards).
- **Responsive Design**: Ensures usability on devices of all sizes.
- **Efficient Backend**: Built with Express to provide APIs for filtering options and drama data.
- **Reliable Database**: PostgreSQL for data management and storage.

---

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v13 or higher)
- **npm** or **yarn**

---

### Steps to Run Locally Without Docker

1. **Clone the Repository**:
   git clone https://github.com/yourusername/dramaku.git
   cd dramaku

2. **Setup the Database**:

   Create a PostgreSQL database named moviedb.
   Import the schema from the deployweb/local_db_dump.sql file:
	psql -U your_username -d dramaku_db -f deployweb/local_db_dump.sql

3. **Configure Database**:
	Update the backend/config/db.js file with your PostgreSQL credentials.

4. **Install Dependencies**:
	#### Install backend dependencies
	cd dramaku-webdev
	npm install

	#### Install frontend dependencies
	cd ../node-dramaku-webdev
	npm install

5. **Run the Application**:
    Start the backend server:
	cd node-dramaku-webdev
	npm start

    Start the frontend server (open another terminal):
	cd dramaku-webdev
	npm start

6. **Access the Application**: 
     Open your browser and navigate to 
	http://localhost:3000.

---

### Steps to Run Locally With Docker

1. **Clone the Repository**:
   git clone https://github.com/yourusername/dramaku.git
   cd dramaku

2. **Install and Configure Docker Desktop**:
    For windows https://docs.docker.com/desktop/setup/install/windows-install/
    Open command prompt / powershell : wsl --install
    Finish Docker Desktop installation and restart your device

3. **Configure docker-compose.yml file**:
    Modify the POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB to match your database

4. **Setup the Database-Part 1**:
    On the current directory path, run command: 
    pg_dump -U postgres -h localhost -p 5432 -d moviedb > local_db_dump.sql
    Insert your database password when asked

5. **Start the Application**:
    Open Docker Desktop application
    On the different terminal from step 4, run command:
    docker-compose up --build

6. **Setup the Database-Part 2**:
    Run command:
    docker exec -it deployweb-database-1 bash
    pg_dump -U postgres -d moviedb > /tmp/local_db_dump.sql
    exit
    docker cp deployweb-database-1:/tmp/local_db_dump.sql ./local_db_dump.sql

7. **Restart the Application**:
    Run command:
    docker-compose down -v
    docker-compose up --build

8. **Access the Application**: 
    Open your browser and navigate to 
	http://localhost:3000.

---

## Demo
Demonstrate application using Docker
Youtube: https://youtu.be/tMHYJuOAKeY
