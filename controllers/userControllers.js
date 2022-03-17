const getUsers = (req, res) => {
    res.status(200).json({message: 'Get users'})
}

module.exports = {
    getUsers
}