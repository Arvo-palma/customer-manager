This is a full stack project in a monorepository made for Facilia Jurídico's developer job selection process.

Frontend stack: Typescript, React.js, Next.js, Tailwind.css, Material UI and React query.
Backend stack: Typescript, Node.js, Adonis.js, Postgres and Swagger.

## How to run this project:

First, clone this repository:

```bash
git clone git@github.com:Arvo-palma/customer-manager.git
```

Open the folder in VSCode and run:

```bash
yarn
```

Obs.: If you don't have yarn installed run "npm install --global yarn".

Then, go to the backend folder and run the commands to create the tables and populate:

```bash
cd ./apps/backend/
and
node ace migration:run
and
node ace db:seed
```

Run the project in two different terminals:

Frontend:

```bash
cd ./apps/admin/
and
yarn dev
```

Backend:

```bash
cd ./apps/backend/
and
yarn dev
```

Go to the browser and check the result in http://localhost:3000/

If you want to check the database documentation go to: http://localhost:3333/docs/

To visit the [project repository](https://github.com/Arvo-palma/customer-manager) click here

To see the [video apresentation of project](https://www.loom.com/share/de7a67137593466db98f7a09d70ee6c9?sid=6456c772-58a3-42c2-96fa-5287f266e55b) click here
