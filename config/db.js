import pgp from "pg-promise"
const db = pgp(process.env.DATABASE_URL)

db.connect()
    .then(obj => {
        obj.done()
        console.log("Database connected...")
    })
    .catch(err => {
        console.log("Error connecting to the database")
    })

export default db;