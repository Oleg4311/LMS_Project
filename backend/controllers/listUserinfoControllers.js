const { UserInfo, Group } = require("../db/models");

exports.listUserinfo = async (req, res) => {

    // try {
    //     const userinform = await UserInfo.findOne({where: {user_id : 6}}
    //     );
    //     console.log(userinform);
    //     res.json(userinform)
    // } catch (error) {
    //     console.log('ERROR LIST==>', error.message);
    // }
        try {
        const userinform = await UserInfo.findOne({where: {user_id : 6},
            include: { 
              model : Group , 
            },
      
            }
        );
        console.log(userinform);
        res.json(userinform)
    } catch (error) {
        console.log('ERROR LIST==>', error.message);
    }
}