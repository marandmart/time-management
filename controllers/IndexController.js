class Controller {
    static async get(req, res, next) {
        try {
            res.render('index', { title: 'Gerenciador de cronogramas' });
        } catch (error) {
            res.status(500).json({ message: error?.message });
        }
    }
}

module.exports = Controller