const checkRole = (roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message : "Acces forbidden! You don't have any access to this page"})
        }
        next()
    };
};

module.exports = {checkRole};