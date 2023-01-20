const {Vote, Answer, Group, User, UserInfo} = require("../db/models");

exports.allVotes = async (req, res) => {
    const user_id = req.session.currentUserId
    const user_role = req.session.currentRole
    const {group_id} = await User.findByPk(user_id)
    if (user_role === 'teacher') {
        try {
            const allVotes = await Vote.findAll({
                    where: {
                        user_id
                    },
                    include: [
                        {
                            model: Group,
                            attributes: ['name']
                        }]
                }
            );
            res.json(allVotes)
        } catch (error) {
            console.log('ERROR LIST==>', error.message);
        }
    } else {
        try {
            const allVotes = await Vote.findAll({
                    where: {
                        group_id: group_id,
                    },
                    include: [
                        {
                            model: Answer,
                        }],
                    order: [
                        ['createdAt', 'DESC']
                    ],
                },
            );
            res.json(allVotes)
        } catch (error) {
            console.log('ERROR LIST==>', error.message);
        }
    }
};

exports.createVote = async (req, res) => {
    const user_id = req.session.currentUserId
    try {
        const newVote = await Vote.create({
            user_id,
            name: req.body.name,
            data: JSON.stringify(req.body.data),
            group_id: req.body.group_id
        });
        res.status(201).json(newVote);
    } catch (error) {
        console.log('ERROR CREATE==>', error.message);
    }
}

exports.deleteVote = async (req, res) => {
    const user_id = req.session.currentUserId
    try {
        const vote = await Vote.findByPk(req.params.id);
        await vote.destroy();
        const allVotes = await Vote.findAll({
                where: {
                    user_id
                }
            }
        );
        res.json(allVotes)
    } catch (error) {
        console.log('ERROR DELETE==>', error.message);
    }
}

exports.getVoteById = async (req, res) => {
    const user_id = req.session.currentUserId
    try {
        const vote = await Vote.findByPk(req.params.id);
        const answer = await Answer.findOne({
            where: {
                vote_id: req.params.id,
                user_id,
            }
        });
        const groupMembersCount = await User.count({
            where: {
                group_id: vote.group_id
            }
        });
        const allAnswers = await Answer.findAll({
            where: {
                vote_id: req.params.id,
            },
            include: [
                {
                    model: User,
                    attributes: ['id'],
                    include: [
                        {
                            model: UserInfo,
                           attributes: ['name', 'surname']
                        }]
                }]
        });
        res.json({
            ...vote.dataValues,
            isAnswered: !!answer,
            answer: answer ? answer.dataValues : null,
            allAnswers: allAnswers.map(item => ({
                answer: JSON.parse(item.dataValues.data),
                item: item.dataValues,
            })),
            groupMembersCount
        });
    } catch
        (error) {
        console.log('ERROR GET==>', error.message);
    }
}
;

exports.createVoteAnswer = async (req, res) => {
    const user_id = req.session.currentUserId
    const {id} = req.params;
    const data = JSON.stringify(req.body.data);
    try {
        const answer = await Answer.create({
            data,
            user_id,
            vote_id: id
        });
        res.status(201).json(answer);
    } catch (error) {
        console.log('ERROR CREATE ANSWER==>', error.message);
    }
}
