"use client"

import { VideoSection } from "@/app/(main)/communities/[slug]/renderContent/member/modules/[moduleId]/sections/VideoSection";
import { lessons } from "@/lib/data";
import { CommentsSection } from "./sections/CommentsSection";
import { LessonInfo } from "./sections/LessonInfoSection";

const ModuleDetailsMember = () => {
    const currentLesson = lessons[0]

    return (
        <section className="space-y-4">
            <div className="flex">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Video Player */}
                    <div className="flex-1 p-6">
                        <VideoSection lesson={currentLesson} />
                    </div>

                    {/* Lesson Information */}
                    <div className="p-6 border-t border-gray-700">
                        <LessonInfo lesson={currentLesson} />
                        {/* <CommentsSection lesson={currentLesson} /> */}
                    </div>
                    <div className="border-t border-gray-800 p-6">
                        <CommentsSection lesson={currentLesson} />
                    </div>
                </div>
            </div>

        </section>
    );
}

export default ModuleDetailsMember;