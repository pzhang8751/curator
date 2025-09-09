import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();



export async function createDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.AWS_SQL_HOST,
        user: process.env.AWS_SQL_USER,
        password: process.env.AWS_SQL_PASSWORD,
        database: "curratory-sql-test",
        port: 3306
    })
    connection.connect(err => {
        if (err) {
            console.log("Connection failed");
            return;
        }

        console.log("Connection succeded");

        connection.query("SELECT NOW() AS now", (err, results) => {
            if (err) {
                console.error("❌ Query failed:", err.stack);
            } else {
                console.log("✅ Query result:", results);
            }
            connection.end();
        });
    })
}

export async function uploadCaption(caption) {

}