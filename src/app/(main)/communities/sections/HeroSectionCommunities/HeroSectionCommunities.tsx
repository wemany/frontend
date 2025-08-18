"use client"

import SearchInput from "@/components/SearchInput"
import { Globe, Users, MessageCircle, Award } from "lucide-react"

const qickStatsList = [
    { label: "Active Communities", value: "150+", icon: Users, bgColor: "bg-purple-500/20" },
    { label: "Total Members", value: "2.5M+", icon: Globe, bgColor: "bg-green-500/20" },
    { label: "Daily Posts", value: "15K+", icon: MessageCircle, bgColor: "bg-yellow-500/20" },
    { label: "Success Stories", value: "500+", icon: Award, bgColor: "bg-orange-500/20" },
]

const HeroSectionCommunities = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-dark-800 to-purple-900/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-700/20 to-transparent animate-pulse"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10 container mx-auto px-6 pt-32 pb-16">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="font-radio-canada text-5xl md:text-6xl font-bold text-white-100 mb-6 leading-tight">
                        Find Your
                        <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent"> Community</span>
                    </h1>

                    <p className="font-open-sauce text-xl text-gray-400 mb-8 leading-relaxed">
                        Connect with like-minded individuals, share knowledge, and grow together in communities
                        that match your interests and passions.
                    </p>

                    {/* Search Bar */}
                    <SearchInput />
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 mt-8 gap-6 max-w-2xl mx-auto">
                        {qickStatsList.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                    <stat.icon className={`w-6 h-6 text-white-100`} />
                                </div>
                                <div className={`font-jetbrains text-2xl font-bold text-white-100 mb-1`}>
                                    {stat.value}
                                </div>
                                <div className="font-open-sauce text-sm text-gray-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSectionCommunities