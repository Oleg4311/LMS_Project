const { UserInfo, Group } = require("../db/models");

exports.listUserinfo = async (req, res) => {
    const userId = req.session.currentUserId
        try {
        const userinform = await UserInfo.findOne({logging: console.log, where: {user_id : userId},
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