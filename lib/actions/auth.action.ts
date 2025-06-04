'use server';

import {cookies} from "next/headers";
import {db, auth} from "@/firebase/admin";

const ONE_WEEK = 60 * 60 * 24 * 7

export async function signUp(params: SignUpParams){
    const { uid, name, email} = params

    try{
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists. Login instead',
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account created successfully. Please login now',
        }

    } catch (e : never){
        console.error('Error creating user',e);

        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message: `User already exists`,
            }
        }

        return {
            success: false,
            message: 'Failed to register user',
        }
    }
}

export async function signIn(params: SignInParams){
    const {email, idToken} = params

    try{

        const userRecord = await auth.getUserByEmail(email)

        if(!userRecord){
            return {
                success: false,
                message: 'User not registered. Create account instead',
            }
        }
        await setSessionCookie(idToken)

    } catch(e){
        console.log(e)

        return {
            success: false,
            message: 'Failed to login',
        }
    }
}

export async function setSessionCookie( idToken : string) {
    const cookieStore = await cookies()

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn : ONE_WEEK * 1000
    })

    cookieStore.set("session", sessionCookie, {
        maxAge : ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

// export async function getCurrentUser(): Promise<User | null> {
//     const cookieStore = await cookies();
//
//     const sessionCookie = cookieStore.get('session')?.value
//
//     if(!sessionCookie) {
//         return null
//     }
//
//     try{
//
//     } catch (e){
//         console.log(e)
//         return null
//     }
// }