const profileHandler = (req, res, db) => {
    const { id } = req.params;
    ////////////////////with ES6 " {id: id} == {id} "
    db.select('*').from('users').where({id}).then(user => {
         if(user.length){ 
             res.json(user[0])
         }else{
            res.status(400).json("not user");
         }
    }).catch(err => res.status(400).json("Error getting user"));
    // if (!found){
    //     res.status(400).json("not user");
    // }
}

module.exports = {
    profileHandler: profileHandler
};