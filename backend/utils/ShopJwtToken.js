const sendShopToken = (seller, statusCode, res) => {
    const token = seller.getJwtToken();

    // Options for cookies
    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: true, // Send only over HTTPS
        };

    res.status(statusCode)
       .cookie("seller_token", token, options)
       .json({
            success: true,
            seller,
            token,
       });
};

module.exports = sendShopToken;
