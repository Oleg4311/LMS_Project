const { Router } = require ('express')
const fileMiddleware = require('../middleware/filelectures')
const { Lecture, File } = require("../db/models");

const router = Router ()

// router.post('/uploadfile', fileMiddleware.single('file'), async (req,res) => {
    router.post('/uploadfile', fileMiddleware.array('file',2), async (req,res) => {
    try {
        if (req.files){
            // res.json(req.file)
            // res.json({ user: 'geek' })
            // res.send(res.body{ title: 'GeeksforGeeks' })
            // res.append('Content-Length', '5089990');
            res.json(req.file)
            const lecturesload = await Lecture.create(
                { name: req?.body.name, user_id: req?.session.currentUserId, group_id: req?.body.group_id }
              );

                const files = req.files.map(item => ({
                    name: item.originalname ,
                  group_id: req?.body.group_id,
                  type: item.mimetype,
                  description: req?.body.name,
                  url: req?.body.url,
                  lectures_id: lecturesload?.id
                }))
                await File.bulkCreate(files);

            // const filecreate = await File.create(
            //     { name: req?.file.filename ,
            //       group_id: req?.body.group_id,
            //       type: req?.file.mimetype,
            //       description: req?.body.name,
            //       url: req?.body.url,
            //       lectures_id: lecturesload?.id}
            // )
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
