import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export async function createDatabase() {
    // connecting to AWS RDS via mysql
    const connection = await mysql.createConnection({
        host: process.env.AWS_SQL_HOST,
        user: process.env.AWS_SQL_USER,
        password: process.env.AWS_SQL_PASSWORD,
        database: "curratory-sql-test",
        port: 3306
    })

    // create table query
    // does not support multiposts
    const [results, fields] = await connection.query(
        'CREATE TABLE IF NOT EXISTS posts (post_id BIGINT AUTO_INCREMENT, account_id VARCHAR(36), order_id BIGINT, type ENUM(\'image\', \'video\', \'audio\'), bucket_link VARCHAR)'
    );

    console.log(results);
    console.log(fields);
}

export async function uploadCaption(caption) {

}