import { sql } from "./db.js";

/*sql`drop table if exists videos`.then(() => {
	console.log("Table dropped");
})*/

sql`
	CREATE TABLE videos (
	id 		TEXT PRIMARY KEY,
	title 	TEXT,
	description TEXT,
	duration INTEGER
);
`.then(() => {
	console.log("Table created");
})