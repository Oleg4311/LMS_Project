const {Op, fn, col} = require('sequelize');
const {User, UserChat, Room, Message, UserInfo} = require('../db/models');

exports.findOrCreateChat = async (req, res) => {
    try {
        const {userId} = req.body;
        const {currentUserId} = req.session;
        const chats = await UserChat.findAll({
            attributes: ['room_id', [fn('COUNT', col('room_id')), 'count_users']],
            where: {
                profile_id: {
                    [Op.not]: null
                },
                [Op.or]: [
                    {user_id: currentUserId},
                    {
                        user_id: userId
                    },
                ],
            },
            group: ['room_id'],
        })
        const room = chats.find(chat => chat.dataValues.count_users === "2");
        if (!room) {
            const newRoom = await Room.create();
            const {login: currentUserName} = await User.findOne({
                where: {
                    id: currentUserId
                }
            })
            const {login: login} = await User.findOne({
                where: {
                    id: userId
                }
            });
            const {
                id, name
            } = await UserChat.create({
                user_id: currentUserId,
                profile_id: userId,
                room_id: newRoom.id,
                name: userId === currentUserId ? "Сохраненные сообщения" : login,
                isGroup: false,
            });
            if (userId !== currentUserId) {
                await UserChat.create({
                    user_id: userId,
                    profile_id: currentUserId,
                    room_id: newRoom.id,
                    name: currentUserName,
                    isGroup: false,
                });
            }
            res.json({
                id,
                name
            });
        } else {
            const {id, name} = await UserChat.findOne({
                where: {
                    room_id: room.dataValues.room_id,
                    user_id: currentUserId
                }
            })
            res.json({
                id,
               name
            });
        }

    } catch (error) {
        res.status(500).send({message: error.message});
    }

};

exports.findAllChatsForCurrentUser = async (req, res) => {
    try {
        if (req.session.currentUserName) {
            const chats = await UserChat.findAll({
                attributes: ['id', 'name'],
                where: {
                    user_id: req.session.currentUserId,
                    isGroup: false,
                }, include: {
                    model: User,
                    attributes: ['id'],
                    include: {
                        model: UserInfo,
                        attributes: ['photo']
                    }
                }
            })
            res.json({
                chats
            });
        } else {
            res.send({message: 'You have to be logged in to see all chats'});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

exports.findHistoryForChat = async (req, res) => {
    try {
        if (req.session.currentUserName) {
            const {id} = req.params;
            const chat = await UserChat.findOne({
                where: {
                    id
                },
                include: {
                    model: User,
                    attributes: ['id'],
                    include: {
                        model: UserInfo,
                        attributes: ['photo']
                    }
                }
            })
            const room = await Room.findOne({
                where: {
                    id: chat.room_id
                }
            });

            const messages = await Message.findAll({
                where: {
                    room_id: chat.room_id
                },
                include: {
                    model: User,
                }
            })
            res.json({
                messages: messages.map(message => ({
                    message: message.dataValues.text,
                    time: message.dataValues.createdAt,
                    user_id: message.dataValues.user_id,
                    user_name: message.dataValues.User.dataValues.login,
                    isRead: message.dataValues.isRead
                })),
                name: chat.name,
                img: chat?.dataValues?.User?.dataValues?.UserInfos?.[0]?.dataValues?.photo,
                isPublic: !!room.dataValues.name,
                our_id: req.session.currentUserId,
            });
        } else {
            res.send({message: 'You have to be logged in to see all chats'});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


