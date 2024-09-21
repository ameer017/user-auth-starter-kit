const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Token = require("../model/tokenModel");
const User = require("../model/authModel");
const crypto = require("crypto");
const { generateToken, hashToken, sendMail } = require("../utils/index");
const jwt = require("jsonwebtoken");


exports.createUser = asyncHandler(async (req, res) => {
    // Request properties for the user
    const { fullName, emailAddress, password } = req.body;

    // check if the properties are provided
    if (!fullName || !emailAddress || !password) {
        res.status(400);
        throw new Error("Please, fill all fields");
    }

    //  check if the password length is less than 8 chars
    if (password.lenght < 8) {
        res.status(400);
        throw new Error("Password must be of 8 characters long")
    }

    // Check if a user with the supplied email already exists
    const checkUser = await User.findOne({ emailAddress });

    if (checkUser) {
        res.status(400);
        throw new Error("Email already taken, do you already have an account?")
    }
    //  save user object to the database
    const newUser = await User.create({
        fullName,
        emailAddress,
        password
    })

    // generate a token and attach it to the regitstered user
    const token = generateToken(newUser._id)

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (newUser) {
        await sendMail({
            from: process.env.EMAIL_USER,
            to: newUser.emailAddress,
            subject: "Account created Successfully",
            html: `
                <p>Hi ${newUser.fullName},</p>

                    <p>We're excited to have you on board!</p>

                 <p>Your account has been successfully created on <strong>user-auth-starter-kit</strong>, and you're now ready to explore all the features we offer.</p>

                    <p>Here's a summary of your account details:</p>
                    <ul>
                        <li>Email: ${newUser.emailAddress}</li>
                        <li>Phone Number: ${newUser.phone_no}</li>
                    </ul>

                    <p>If you ever have any questions or need assistance, don't hesitate to reach out to our support team at <a href="mailto:support@example.com">[Support Email]</a>. We're here to help!</p>

                 <p>Thank you for joining us. We're looking forward to seeing you thrive on our platform.</p>

                    <p>Best regards,<br>
                    <strong>user-auth-starter-kit</strong></p>
                
                `
        })
        const { _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture } = newUser;

        console.log(newUser);

        res.json({
            _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture,
            token
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})

exports.loginUser = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
        res.status(400);
        throw new Error("All fields are required!")
    }

    const foundUser = await User.findOne({ emailAddress });

    if (!foundUser) {
        res.status(404);
        throw new Error("User not found! Are you registered?")
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);

    if (!checkPassword) {
        res.status(400);
        throw new Error("Email or Password incorrect")
    }

    const token = generateToken(foundUser._id)

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (foundUser && checkPassword) {
        const { _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture } = foundUser;

        console.log(foundUser);

        res.json({
            _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture,
            token
        })
    }

})

exports.logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "User logged out successfully!" })
})

exports.getUser = asyncHandler(async (req, res) => {
    //  get a single user by their id
    const user = await User.findById(req.params.id);

    if (user) {
        const { _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture } = user;

        res.status(200).json({
            _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture
        })
    } else {
        res.status(404);
        throw new Error("User not found!")
    }


})

exports.getUsers = asyncHandler(async (req, res) => {
    //  Find and get all available users, arrange them in the order of their creation [last to be created] and do not include their password
    const users = await User.find().sort("-createdAt").select("-password").exec();

    if (!users) {
        res.status(404)
        throw new Error("Users not found!");
    }

    return res.status(200).json(users);
})

exports.upgradeUser = asyncHandler(async (req, res) => {
    //  Properties needed for the upgrade, new role and the user's id
    const { role, id } = req.body;

    //  fetch the user with the id
    const user = await User.findById(id);

    if (!user) {
        res.status(404);
        throw new Error("User not found!")
    }

    // Role specified is now the user's role
    user.role = role;
    await user.save();

    // return output in json format.
    res.status(200).json({
        message: `User role updated to ${role}`,
    });
})

exports.updateUser = asyncHandler(async (req, res) => {
    //  fidn user by their id
    const user = await User.findById(req.user._id);

    // Properties to be updated
    const { fullName, phone_no, address, picture } = user;

    //  provided data or their details remains
    user.fullName = req.body.fullName || fullName
    user.phone_no = req.body.phone_no || phone_no;
    user.address = req.body.address || address;
    user.picture = req.body.picture || picture;

    // save the new details if there is
    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        emailAddress: updatedUser.emailAddress,
        phone_no: updatedUser.phone_no,
        address: updatedUser.address,
        verified: updatedUser.verified,
        role: updatedUser.role,
        gender: updatedUser.gender,
        picture: updatedUser.picture,
    })

})

exports.sendVerificationEmail = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error("User already verified");
    }

    // Delete Token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    }

    //   Create Verification Token and Save
    const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(verificationToken)

    // Hash token and save
    const hashedToken = hashToken(verificationToken);
    await new Token({
        userId: user._id,
        vToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
    }).save();

    // Construct Verification URL
    const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

    await sendMail({
        from: process.env.EMAIL_USER,
        to: user.emailAddress,
        subject: "Verify Your Account",
        html: `
           <p>Dear ${user.fullName},</p>

            <p>Welcome to <strong>User-auth-starter-kit</strong>! We're excited to have you on board.</p>

            <p>Before you can start exploring all the amazing features we offer, please verify your email address by clicking the button below:</p>

            <p><a href='${verificationUrl}' style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px;">Verify Your Account</a></p>

            <p>Or, you can copy and paste the following link into your browser:</p>

            <p>
            '${verificationUrl}'
            </p>

            <p>Verifying your account ensures the security of your profile and helps us provide you with a personalized experience.</p>

            <p>If you did not create this account, please ignore this email.</p>

            <p>Thank you for joining <strong>User-auth-starter-kit</strong>!</p>

            <p>Best regards,<br>
            The <strong>User-auth-starter-kit</strong> Team</p>
        `
    })
})

exports.verifyUser = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    const hashedToken = hashToken(verificationToken);

    const userToken = await Token.findOne({
        vToken: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token");
    }

    // Find User
    const user = await User.findOne({ _id: userToken.userId });

    if (user.isVerified) {
        res.status(400);
        throw new Error("User is already verified");
    }

    // Now verify user
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Account Verification Successful" });
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
        res.status(404);
        throw new Error("User not found");
    }

    await userToDelete.deleteOne();
    return res.status(200).json({ message: "User deleted successfully!" })
})

exports.resetPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    console.log(resetToken);
    console.log(password);

    const hashedToken = hashToken(resetToken);

    const userToken = await Token.findOne({
        rToken: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        res.status(404);
        throw new Error("Invalid or Expired Token");
    }

    // Find User
    const user = await User.findOne({ _id: userToken.userId });

    // Now Reset password
    user.password = password;
    await user.save();

    res.status(200).json({ message: "Password Reset Successful, please login" });
});

exports.changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (!oldPassword || !password) {
        res.status(400);
        throw new Error("Please enter old and new password");
    }

    // Check if old password is correct
    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

    // Save new password
    if (user && passwordIsCorrect) {
        user.password = password;
        await user.save();

        res
            .status(200)
            .json({ message: "Password change successful, please re-login" });
    } else {
        res.status(400);
        throw new Error("Old password is incorrect");
    }
})

exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("No user with this email");
    }

    // Delete Token if it exists in DB
    let token = await Token.findOne({ userId: user._id });
    if (token) {
        await token.deleteOne();
    }

    //   Create Verification Token and Save
    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    console.log(resetToken);

    // Hash token and save
    const hashedToken = hashToken(resetToken);
    await new Token({
        userId: user._id,
        rToken: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 60 * (60 * 1000), // 60mins
    }).save();

    // Construct Reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

    // Send Email

});

exports.loginWithGoogle = asyncHandler(async (req, res) => {
    const { userToken } = req.body;
    //   console.log(userToken);

    const ticket = await client.verifyIdToken({
        idToken: userToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture, sub } = payload;
    const password = Date.now() + sub;

    // Get UserAgent
    const ua = parser(req.headers["user-agent"]);
    const userAgent = [ua.ua];

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        //   Create new user
        const newUser = await User.create({
            name,
            email,
            password,
            photo: picture,
            isVerified: true,
            userAgent,
        });

        if (newUser) {
            // Generate Token
            const token = generateToken(newUser._id);

            // Send HTTP-only cookie
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true,
            });

            const { _id, name, email, phone, bio, photo, role, isVerified } = newUser;

            res.status(201).json({
                _id,
                name,
                email,
                phone,
                bio,
                photo,
                role,
                isVerified,
                token,
            });
        }
    }

    // User exists, login
    if (user) {
        const token = generateToken(user._id);

        // Send HTTP-only cookie
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true,
        });

        const { _id, name, email, phone, bio, photo, role, isVerified } = user;

        res.status(201).json({
            _id,
            name,
            email,
            phone,
            bio,
            photo,
            role,
            isVerified,
            token,
        });
    }
})

exports.loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        return res.json(true);
    }
    return res.json(false);
});