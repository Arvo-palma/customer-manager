This is a full stack project in a monorepository made for Facilia Jurídico's developer job selection process.

## How to run this project:

First, clone this repository:

```bash
git clone <repository SSH>
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
