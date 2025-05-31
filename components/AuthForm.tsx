"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import {toast} from "sonner"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"


const authFormSchema = ( type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string(),
        email : z.string().email(),
        password: z.string().min(4),
    })
}


const AuthForm = ( { type } : { type : FormType }) => {

    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if( type === "sign-in" ) {
                console.log('SIGN-IN', values)
            }else{
                console.log('SIGN-UP', values)
            }

        } catch (error){
            console.log(error)
            toast.error(`An error was encountered : ${error}`)
        }
    }

    const isSignIn = type === "sign-in"


    return (
        <div className="card-border lg:min-w-[565px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row justify-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={33} height={22}/>
                    <h2 className="text-primary-100"> IntelliPrep </h2>
                </div>
                <h4> Helping you perfect Interviews </h4>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 form space-y-6">

                        {!isSignIn && <p>Name</p>}
                        <p>Email</p>
                        <p>Password</p>

                        <Button className="btn" type="submit">
                            {isSignIn ? "Sign-In" : "Create Account"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "Dont have an account?  " : "Already have an account?"}
                    <Link href={isSignIn ? '/sign-up' : 'sign-in'} className="font-bold text-user-primary ml-1">
                        {isSignIn ? "Sign Up" : "Sign-Up"}
                    </Link>
                </p>

            </div>

        </div>
    )
}
export default AuthForm


