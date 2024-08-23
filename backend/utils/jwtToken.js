const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // Options for cookies
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true, // Send only over HTTPS
        sameSite: 'None',
    };

    res.status(statusCode)
       .cookie("token", token, options)
       .json({
            success: true,
            user,
            token,
       });
};

module.exports = sendToken;
