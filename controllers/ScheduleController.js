var db = require("../db/database");

class ScheduleController {
    static async getAll(req, res, next) {
        try {
            const sql = "select * from worked_hours inner join user on worked_hours.userId=user.id";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                    return;
                }

                const data = rows.map(row => {
                    const processedDate = new Date(row.date);

                    return {
                        name: row.name,
                        date: `${processedDate.getDate() + 1}/${processedDate.getMonth() + 1}/${processedDate.getFullYear()}`,
                        start_time: `${row.start_time}h`,
                        end_time: `${row.end_time}h`
                    };
                });

                res.render(
                    "schedules",
                    {
                        title: "Lista de Horas trabalhadas",
                        data
                    })
            })
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async getOne(req, res, next) {
        try {
            const { scheduleId } = req.params;
            const sql = `select * from worked_hours where id = ${scheduleId}`;
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

    static async createOne(req, res, next) {
        try {
            const { userId, date, start_time, end_time } = req.body;
            const sql = "insert into worked_hours (userId, date, start_time, end_time) values (?,?,?,?)"
            db.run(sql, [userId, date, parseInt(start_time), parseInt(end_time)], err => {
                if (err) {
                    console.error("Error creating entry:", err.message)
                } else {
                    res.redirect("/")
                }
            })

        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }

    static async showForm(req, res, next) {
        try {
            const sql = "select id, name from user";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                    return;
                }

                res.render("schedule-form",
                    { options: rows }
                );
            })

        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }
}

module.exports = ScheduleController