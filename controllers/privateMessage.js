const Friendship = require('../models/friendship');

module.exports.message = async (req,res) => {
    try{
        const { _id: from } = req.user || {};
        const { to } = req.params || {};

        let friend = await Friendship.find({from_user: from, to_user: to}, "messages");

        if(friend.length === 0) {
            friend = await Friendship.find({from_user: to, to_user: from});
        }

        return res.status(200).json({
            message:"Here is your private message",
            data: {
                pm:friend,
            }
        })
    }catch(error){
        return res.status(500).json({
            message: "Opps something went wrong!",
            data: {
              error: error,
            }
        })
    }
}

module.exports.addMessage = async (req,res) => {
     try{
        const { _id: from } = req.user || {};
        const { to } = req.params || {};
        let friendShip =await Friendship.find({from_user: from, to_user: to});

        if(friendShip.length === 0){
            friendShip = await Friendship.find({from_user: to, to_user: from});
        }
        const privateMessage = {
            msg:req.body.message,
            user_id: from,
        }
        friendShip[0].messages.push(privateMessage);
        await friendShip[0].save();
        return res.status(200).json({
            message:"Your message has been added!",
            data: {
                message: friendShip[0].messages,
                friendShip,
            }
        })
    }catch(error){
        return res.status(500).json({
            message:"Error while adding the message to the dB!",
            data: {
                error,
            }
        })
    }
}
