const prisma = require('../config/db');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role = 'ADMIN'
        } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {

            return res.status(400).json({
                status: false,
                message: 'Email already exists'
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });

        return res.json({
            status: true,
            message: 'Register success',
            data: user
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: err.message
        });

    }

};

exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {

            return res.status(400).json({
                status: false,
                message: 'User not found'
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                status: false,
                message: 'Wrong password'
            });

        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        return res.json({
            status: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: err.message
        });

    }

};