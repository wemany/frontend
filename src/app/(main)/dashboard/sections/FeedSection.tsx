"use client"
import { feedPosts } from "@/lib/data"
import PostCard from "../components/ui/PostCard"
import { motion } from "framer-motion"

const FeedSection = () => {
    return (
        <div className="space-y-1">

            <div className="h-[525px] overflow-y-auto snap-y snap-mandatory">

                {feedPosts.map((post) => (
                    <div
                        key={post.id}
                        className="h-full flex items-center justify-center snap-start snap-always"
                    >
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 500 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="h-full"
                        >
                            <PostCard post={post} />
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeedSection