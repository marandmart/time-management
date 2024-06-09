var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    // Table just created, add some mock data
                    var insert = 'INSERT INTO user (name, email) VALUES (?,?)'
                    db.run(insert, ["joao", "joao@example.com"])
                    db.run(insert, ["pedro", "pedro@example.com"])
                }
            });
        db.run(`CREATE TABLE worked_hours (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            date DATE NOT NULL,
            start_time INTEGER NOT NULL,
            end_time INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES user(id)
            )`,
            err => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    var insert = 'INSERT INTO worked_hours (userId, date, start_time, end_time) VALUES (?,?,?,?)'
                    db.run(insert, [1, "2024-04-25", 9, 17])
                    db.run(insert, [2, "2024-03-22", 9, 17])
                }
            }
        )
    }
});


module.exports = db