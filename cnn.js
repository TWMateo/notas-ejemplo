const pgPromise=require("pg-promise");

const config={
    host:"dpg-ccth3kun6mptlbsgsu4g-a.oregon-postgres.render.com",
    port:"5432",
    database:"Estudiantes",
    user:"notas_ejemplo_user",
    password:"ZRXPNm7KXAp6c2lWEcGAla9b0b0WOxPG",
    ssl:true
};

const configLocal={
    host:"localhost",
    port:"5432",
    database:"Estudiantes",
    user:"postgres",
    password:"0505"
};

const pgp = pgPromise({});
const db = pgp(config);
exports.db = db;
