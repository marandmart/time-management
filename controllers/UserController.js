var db = require("../db/database");

class UserController {
    static async getUsers(req, res, next) {
        try {
            const sql = "select * from user";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                    return;
                }
                res.render(
                    "users",
                    {
                        title: "Lista de Usuários",
                        data: rows
                    })
            })
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async getUser(req, res, next) {
        try {
            const { userId } = req.params;
            const sql = `select * from user where id = ${userId}`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                    return;
                }
                res.json({
                    message: "success",
                    data: rows
                })
            })
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async create(req, res, next) {
        try {
            const { name, email } = req.body;
            const sql = `insert into user (name, email) values (?,?)`;
            db.run(sql, [name, email], (err) => {
                if (err) {
                    res.status(400).json({ error: err.message });
                }
                res.redirect("/users")
            })
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async renderForm(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                res.render('user-form');
                return;
            } else {
                const sql = `select * from user where id = ${id}`;
                db.get(sql, [], (err, rows) => {
                    if (err) {
                        res.status(400).json({ error: err.message })
                        return;
                    }
                    const { id, name, email } = rows;
                    res.render('user-form', {
                        edit: {
                            id, name, email
                        }
                    })
                })
            }

        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async update(req, res, next) {
        const { name, email } = req.body;
        const { id } = req.params;
        try {
            const sql = `update user set name = ?, email = ? where id = ?`;
            db.run(sql, [name, email, id], (err) => {
                if (err) {
                    return console.error(err.message);
                }
                res.redirect("/users")
            })
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async remove(req, res, next) {
        const { id } = req.params;
        try {
            const sql = `delete from user where id = ${id}`
            db.run(sql, [], err => {
                if (err) {
                    return console.error(err.message);
                }
                console.log(`User with id ${id} deleted`)
                res.redirect("/users")
            })
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }
}

module.exports = UserController