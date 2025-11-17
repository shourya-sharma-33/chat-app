import Message from "../models/message.model";
import User from "../models/user.model";

// RENDER USER ON SIDEBAR CONTROLLLER
export const getUsersForSidebar = async(req, res) => {
    try {
        // DESTRUCTURE USER FROM USERID
        const loggedInUserId = req.user._id;
        // END - DESTRUCTURE USER FROM USERID

        // FILTER USER
        const filteredUsers = await User.find({
            _id : {$ne : loggedInUserId}
        }).select("-password");
        // END - FILTER USER

        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({
            error : "interneal server error"
        })
    }

}
// END - RENDER USER ON SIDEBAR CONTROLLLER

// GET MESSAGE
export const getMessages = async (req, res) => {
    try {
        // EXTRACT ID FROM REQUEST
        const {id:userToChatId} = req.params
        const myId = req.user._id;
        // END - EXTRACT ID FROM REQUEST

        // SEARCH MESSAGES
        const messages = await Message.find({
            $or : [
                {senderId : myId, recieverId:userToChatId},
                {senderId : userToChatId, recieverId:myId}
            ]
        });
        // END - SEARCH MESSAGES


        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            error : "internal server error"
        })
    }
}
// END - GET MESSAGE
