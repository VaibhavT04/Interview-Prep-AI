import dayjs from 'dayjs'
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import DisplayTechLogos from "@/components/DisplayTechLogos";
import {getFeedbackByInterviewId} from "@/lib/actions/general.action";

const InterviewCard = async ({ id, userId,
    techstack, type, createdAt, role }:InterviewCardProps) => {

    const feedback = userId && id
    ? await getFeedbackByInterviewId({ interviewId: id, userId }) : null
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
    const formattedDate = dayjs(feedback?.createdAt ||
        createdAt || Date.now()).format('MMM D, YYYY')

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-94 mt-2">
            <div className="card-interview ">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-3 rounded-bl-lg bg-light-800">
                        <p className="badge-text"> {normalizedType}</p>
                    </div>

                    <Image src={getRandomInterviewCover()} alt="company-logo" width={90} height={90}
                           className="rounded-full object-fit size-[90px]" />

                    <h3 className="mt-4 capitalize">
                        {role} Interview
                    </h3>

                    <div className="flex flex-row gap-6 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src='/calendar.svg' alt="calender-logo" width={22} height={22}/>
                            <p>{formattedDate}</p>
                        </div>

                        <div className="flex flex-row gap-2">
                            <Image src='/star.svg' alt='star-logo' width={22} height={22}/>
                            <p> {feedback?.totalScore || '--'}/100</p>
                        </div>
                    </div>

                    <p className='line-clamp-2 mt-5'>
                        {feedback?.finalAssessment || "You haven't taken the interview yet. Take it and improve your skills."}
                    </p>
                </div>

                <div className="flex flex-row justify-between">

                    <DisplayTechLogos techStack={techstack}/>

                    <Button className="btn-primary">
                        <Link href={feedback
                        ? `/interview/${id}/feedback`
                        : `/interview/${id}`}>
                            {feedback ? 'Check feedback' : 'Take Interview'}
                        </Link>

                    </Button>

                </div>
            </div>
        </div>
    )
}
export default InterviewCard
