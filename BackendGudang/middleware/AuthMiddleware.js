const AuthenticationApps = (roles) => {
    return(req, res, next) => {
        if (!req.user) {
            return res.status(401).json({message: "Unauthorized Client! Please Sign In before you access this resource!"                
            });
        }

        if(!roles.includes(req.user.role)) {
            return res.status(403).json({message : "Acces forbidden! You don't have any access to this page nor this feature!"                
            });
        }
        next()
    };
};

module.exports = {checkRole};