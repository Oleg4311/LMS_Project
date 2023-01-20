const { UserInfo, Group } = require("../db/models");

exports.universalUserinfo = async (req, res) => {
    const { id } = req.params
        try {
        const userinform = await UserInfo.findOne({where: {user_id : id},
            include: { 
              model : Group , 
            },
      
            }
        );
        res.json(userinform)
    } catch (error) {
        console.log('ERROR LIST==>', error.message);
    }
}