const User = require("../models/user");
const jwt = require('jsonwebtoken');

module.exports.signUp = async (req, res) => {
  try{
    const { name, email, password, confirmPassword } = req.body || {};
  
    if(password !== confirmPassword) {
      return res.status(400).json({
        message: "password mis-matched!",
        data: {},
      })
    }

    const existingUser = await User.findOne({email: email});

    if(existingUser) {
      return res.status(400).json({
        message: "User already exists!",
        data: {}
      })
    }

    const user = await User.create({ name, email, password });

    return res.status(200).json({
      message: "Successfully signedIn",
      data: {
        user: user,
      }
    })
  }catch(error) {
    return res.status(500).json({
      message: "Opps something went wrong!",
      data: {
        error: error,
      }
    })
  }
}

module.exports.signIn = async (req, res) => {
  try{
    const { email, password } = req.body || {};

    const user = await User.findOne({email: email});

    if(!user) {
      return res.status(400).json({
        message: "Please signUp to use our platform!",
        data: {},
      })
    }

    if(user.password !== password) {
      return res.status(400).json({
        message: "Email/password does not matched!",
        data: {},
      })
    }

    const token = jwt.sign({ email: user.email}, 'secret', { expiresIn: '1h' });

    return res.status(200).json({
      message: "SignIn successfully!",
      data: {
        token,
        user,
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


module.exports.allUsers = async (req,res) => {
  try {
    const users = await User.find({}, 'name');
    return res.status(200).json({
      message: "Successfully fetched the data from database!",
      data: {
        users,
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

module.exports.userFriends = async (req,res) => {
  try{
    const friends = await User.findById(req.user._id).populate({
      path: "friends",
      select: "name",
    });
    return res.status(200).json({
      message: "Successfully fetched the user's friends!",
      data: {
        friends,
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

module.exports.searchFriend = async (req,res) => {
  try{

    const friends = await User.findOne({name: req.body.name}).populate({
      path: "friends",
      select: "name",
    });

    return res.status(200).json({
      message: "Searched friendlist!",
      data: {
        friends,
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

module.exports.currentUserDetails = async (req, res) => {
  try{
    const { _id: userId } = req.user || {};
    const user = await User.findById(userId);

    return res.status(200).json({
      message: "Successfully fetched the user data!",
      data: {
        user,
      }
    })
  }catch(error){
    return res.status(500).json({
      message: "Opps something went wrong!",
      data: {
        error,
      }
    })
  }
}
