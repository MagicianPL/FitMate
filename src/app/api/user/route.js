import connect from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt';


import User from "@/models/userModel";
import { validateSignUpForm } from "@/helpers/helpers";

//Sign Up
export async function POST(req) {
    try {
        const connectedToDB = await connect();
        if (!connectedToDB) {
            return NextResponse.json({ message: "Something goes wrong during connection to database! Try again later" }, { status: 504 })
        }

        const { username, email, password, repeatedPassword } = await req.json();
        console.log(username, email, password, repeatedPassword);

        //Validation
        const [userDataAreValid, errorsToSend] = validateSignUpForm({username, email, password, repeatedPassword}, undefined, true);
        if (!userDataAreValid) {
            return NextResponse.json({ message: errorsToSend }, { status: 400 })
        }

        const existingUserByUsername = await User.findOne({ username });
        console.log('existingUserByUsername', existingUserByUsername)
        if (existingUserByUsername) return NextResponse.json({ message: "User with this nickname already exists" }, { status: 409 });
        const existingUserByEmail = await User.findOne({ email });
        console.log('existingUserByEmail', existingUserByEmail)
        if (existingUserByEmail) return NextResponse.json({ message: "User with this e-mail adress already exists" }, { status: 409 });

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        return NextResponse.json({ message: "User was successful created", user: { username, email} }, { status: 201 });
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({ error: err, message: "Something went wrong during user creation" }, { status: 400 });
    }
};