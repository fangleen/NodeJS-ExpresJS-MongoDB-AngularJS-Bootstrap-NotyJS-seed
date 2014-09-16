module.exports = function(models){

    var User = models.user;

    return {

        signup: function (req,res)
        {

            var body = req.body;

            User.findOne({ username: body.username
            },function(err, user) {
                if (err)
                    res.send(500, {'message': err});
                // check to see if theres already a user with that email
                if (user) {
                    res.send(403, {'message': 'User already exist!'});
                }else {
                    var newUser = new User({ username: body.username,email: body.email, password:body.password})
                    newUser.save(function (err, user) {
                        if (err){
                            res.send(500, {'message': err});
                        }
                        res.json({ 'message': 'User was successfully registered!'});
                    });
                }
            });
        },

        login:function(req,res)
        {
            res.json({ auth_token: req.user.auth_token});
        },

        logout: function(req,res)
        {
            req.user.auth_token = null;
            req.user.save(function(err,user){
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ message: 'See you!'});
            });
        },
        getPeople: function(req,res)
        {

            res.json({people: [{name:'person1',years:3},{name:'person2',years:5},{name:'person3',years:1}] });

        },
        getThings: function(req,res)
        {

            res.json({ things: [{name:'prova',size:3},{name:'prova2',size:5},{name:'prova3',size:1}]});

        }


    }

}


