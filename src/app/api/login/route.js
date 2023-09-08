import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateSignInForm } from "@/helpers/helpers";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig';

export async function POST(req) {
    console.log('req', req)
    try {
        const connectedToDB = await connect();
        if (!connectedToDB) {
            return NextResponse.json({ message: "Something goes wrong during connection to database! Try again later" }, { status: 504 })
        }

        //Validation
        const { email, password } = await req.json();
        console.log('password', password)
        console.log('email', email)
        const [userDataAreValid, errorsToSend]  = validateSignInForm({email, password}, undefined, true);
        console.log('userDataAreValid', userDataAreValid)
        if (!userDataAreValid) {
            return NextResponse.json({ message: errorsToSend }, { status: 400 })
        };

        const user = await User.findOne({ email });
        console.log('user', user)
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
          };
        
        const passwordIsValid = await bcrypt.compare(password, user.password);
        console.log('passwordIsValid', passwordIsValid)
        if (!passwordIsValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
          };

        //Generate Token
        const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: '1h' });

        return NextResponse.json({
            user: user.email,
            token,
            message: 'Signed in successfully!',
        }, { status: 200 });

    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ error: err, message: "Something went wrong during sign-in"}, { status: 400 });
    }
};