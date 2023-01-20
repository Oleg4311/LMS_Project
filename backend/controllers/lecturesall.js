const {Lecture, File} = require ('../db/models');


exports.lecturesall = async (req, res) => {
    try {
        const group_id = req.params.id;
        const lecture = await Lecture.findAll({
          where: {
            group_id: group_id
          },
          include: { 
            model : File , 
          },
      });
        res.json(lecture);
      } catch (error) {
          console.log('ERROR LIST==>', error.message);
      }
}