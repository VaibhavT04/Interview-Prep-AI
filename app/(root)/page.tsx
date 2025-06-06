import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const Page = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col max-w-lg gap-5">
                    <h2 className='font-bold text-5xl'>
                        Turn Interviews Into Offers—with the Right Prep
                    </h2>
                    <p className='text-xl'>
                        Felt like the perfect fit, but couldn’t express it right? Let’s make sure your next interview tells your real story.
                    </p>

                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview"> Start an interview </Link>
                    </Button>
                </div>
                <Image src="/robo.png" alt="robot" width={400} height={400} className="max-md:hidden"/>
            </section>

            <section className="flex flex-col gap-6 mt-5">
                <h2> Your Interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id}/>
                    ))}

                    <p> You havent taken any interviews yet</p>
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-5">
                <h2>Pick your interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard {...interview} key={interview.id}/>
                    ))}
                </div>
            </section>

        </>
    )
}
export default Page
