const { testService } = require('../services');

const helloWorld = async (req, res, next) => {
    try {
        var message = await testService.hello();
        res.status(200).json(message);
    } catch {
        res.status(401).json("Nope !");
    }
}

module.exports = {
    helloWorld
};