"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"               //form state management
import { z } from "zod"                                 //validation
import Image from "next/image"
import Link from "next/link"
import {toast} from "sonner"
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormField from "@/components/FormField";
import {auth} from "@/firebase/client";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {signIn, signUp} from "@/lib/actions/auth.action";

// Dynamic schema for form type (sign-in / sign-up)
const authFormSchema = ( type: FormType ) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string(), // Name required only for sign-up
        email : z.string().email(),
        password: z.string().min(4),
    })
}

const AuthForm = ( { type } : { type : FormType }) => {

    const router = useRouter()
    const formSchema = authFormSchema(type)

    // React Hook Form via Zod from Documentation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password: "",
        },
    })

    // Authentication logic
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if( type === "sign-up" ) {
                
                // Create user with Firebase auth, then store in Firestore by calling signUp
                const { name, email, password } = values

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if(!result?.success){
                    toast.error(result?.message)
                    return;
                }

                toast.success("Account was successfully created. You can now sign in. ")
                router.push("/sign-in")
            } else {

                // Authenticate with Firebase & session cookie
                const { email, password } = values

                const userCredentials = await signInWithEmailAndPassword(auth, email, password)

                const idToken = await userCredentials.user.getIdToken()

                if(!idToken){
                    toast.error("Sign-in failed dude")
                    return
                }

                await signIn({
                    email, idToken
                })

                toast.success("Successfully logged-in")
                router.push("/")
            }

        } catch (error){
            console.log(error)
            toast.error(`An error was encountered : ${error}`)
        }
    }

    const isSignIn = type === "sign-in"

    return (
        <div className="card-border lg:min-w-[450px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row justify-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={33} height={22}/>
                    <h2 className="text-primary-100"> IntelliPrep </h2>
                </div>
                <h4> Helping you perfect Interviews </h4>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 form space-y-6">

                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your Email Address"
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Your Password"
                            type="password"
                        />

                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign-In" : "Create Account"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "Dont have an account?  " : "Already have an account?"}
                    <Link href={isSignIn ? '/sign-up' : 'sign-in'} className="font-bold text-user-primary ml-1">
                        {isSignIn ? "Sign Up" : "Sign-In"}
                    </Link>
                </p>

            </div>

        </div>
    )
}
export default AuthForm


