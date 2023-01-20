
const { UserInfo } = require("../db/models");

exports.updateinfo = async (req, res) => {
    try {
        const update = await UserInfo.update(
          { city: req.body.city, phone: req.body.phone, telegram: req.body.telegram, github: req.body.github, email: req.body.email  },
          { where: { user_id: req.session.currentUserId } },
        );
        res.json(update);
      } catch (error) {
        console.log(error);
      }
}