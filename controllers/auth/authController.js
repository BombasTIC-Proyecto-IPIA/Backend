const authService = require(`../../services/auth/authService`)

const login = async(req, res) => {
    const login = await authService.login(req.body);
    console.log(login);
    if(login){
        res.send({status: "Success" , data: login });
    }
    else {
        res.send({status: "Not allowed"});
    }
};

const logout = (req, res) => {
    const logout = authService.logout(req.body.refreshToken, req.body.userDNI);
    res.send(`Logout`);
};

const getToken = (req, res) => {
    const token = authService.getToken(req.body.refreshToken);
    res.send(`Getting token`);
};

module.exports = {
    login,
    logout,
    getToken,
};