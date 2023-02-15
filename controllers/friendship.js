const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.makeFriend =async (req,res) => {
    try{
        
        const { _id: from } = req.user || {};
        const { to } = req.params || {};

        const userFriends = await User.findById(from, 'friends');
        const isFriendship = userFriends.friends.filter(id => id == to );

        if(isFriendship.length>0){
            return res.status(400).json({
                message:"Friendship already exists!",
                data: {},
            })
        }

        const fromUser = await User.findById(from);
        fromUser.friends.push(to);
        fromUser.save();

        const toUser = await User.findById(to);
        toUser.friends.push(from);
        toUser.save();
        await Friendship.create({
            from_user: from,
            to_user: to,
        })

        const users = await User.findById(to, "name");
        return res.status(200).json({
            message: "FriendShip Done!",
            data: {
                users,
            }
        })
    }catch(error){
        return res.status(400).json({
            message:"error while making the friendship!",
            data: {
                error
            }
        })
    }
}

