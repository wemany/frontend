"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, SkipBack, SkipForward, Settings, Maximize2, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Lesson } from "@/lib/data"

interface VideoPlayerProps {
    lesson: Lesson
}

export function VideoSection({ lesson }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState([80])
    const [showControls, setShowControls] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateTime = () => setCurrentTime(video.currentTime)
        const updateDuration = () => setDuration(video.duration)
        const handleEnded = () => setIsPlaying(false)

        video.addEventListener("timeupdate", updateTime)
        video.addEventListener("loadedmetadata", updateDuration)
        video.addEventListener("ended", handleEnded)

        return () => {
            video.removeEventListener("timeupdate", updateTime)
            video.removeEventListener("loadedmetadata", updateDuration)
            video.removeEventListener("ended", handleEnded)
        }
    }, [lesson.videoUrl])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (isPlaying) {
            video.play().catch(console.error)
        } else {
            video.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        video.volume = volume[0] / 100
    }, [volume])

    // Fullscreen event listeners
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }, [])

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00"
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleSeek = (value: number[]) => {
        const video = videoRef.current
        if (!video || !duration) return
        const newTime = (value[0] / 100) * duration
        video.currentTime = newTime
        setCurrentTime(newTime)
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    const skipTime = (seconds: number) => {
        const video = videoRef.current
        if (!video) return
        const newTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
        video.currentTime = newTime
    }

    const toggleFullscreen = async () => {
        const container = containerRef.current
        if (!container) return

        try {
            if (!document.fullscreenElement) {
                await container.requestFullscreen()
            } else {
                await document.exitFullscreen()
            }
        } catch (error) {
            console.error("Error toggling fullscreen:", error)
        }
    }

    const handleMouseMove = () => {
        setShowControls(true)
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current)
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false)
        }, 3000)
    }

    const progressPercentage = duration ? (currentTime / duration) * 100 : 0

    return (
        <div
            ref={containerRef}
            className={`bg-black overflow-hidden relative ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}
            onMouseMove={handleMouseMove}
        >
            {/* Video Container */}
            <div className="relative aspect-video bg-gray-900">
                {/* Live Badge */}
                {lesson.type === "live" && (
                    <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-red-600 text-white">EN VIVO</Badge>
                    </div>
                )}

                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={lesson.videoUrl}
                    poster={lesson.thumbnail}
                    onClick={togglePlay}
                    crossOrigin="anonymous"
                    preload="metadata"
                />

                {/* Play Button Overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Button
                            size="icon"
                            className="w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                            onClick={togglePlay}
                        >
                            <Play width={40} height={40} className="ml-1" />
                        </Button>
                    </div>
                )}

                {/* Video Controls Overlay */}
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="relative w-full h-1.5 bg-gray-600 rounded-full cursor-pointer group">
                            <div
                                className="absolute h-full bg-purple-600 rounded-full transition-all duration-150"
                                style={{ width: `${progressPercentage}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progressPercentage}
                                onChange={(e) => handleSeek([Number.parseFloat(e.target.value)])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div
                                className="absolute w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 top-1/2 transition-all duration-150 opacity-0 group-hover:opacity-100"
                                style={{ left: `calc(${progressPercentage}% - 8px)` }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => skipTime(-10)}
                                className="text-white hover:bg-white/20"
                            >
                                <SkipBack className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" size="icon" onClick={() => skipTime(10)} className="text-white hover:bg-white/20">
                                <SkipForward className="h-5 w-5" />
                            </Button>

                            <div className="flex items-center gap-2 ml-4">
                                <Volume2 className="h-4 w-4 text-white" />
                                <div className="relative w-20 h-1.5 bg-gray-600 rounded-full cursor-pointer group">
                                    <div
                                        className="absolute h-full bg-white rounded-full transition-all duration-150"
                                        style={{ width: `${volume[0]}%` }}
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume[0]}
                                        onChange={(e) => setVolume([Number.parseFloat(e.target.value)])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div
                                        className="absolute w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 top-1/2 transition-all duration-150 opacity-0 group-hover:opacity-100"
                                        style={{ left: `calc(${volume[0]}% - 6px)` }}
                                    />
                                </div>
                            </div>

                            <span className="text-sm ml-4 text-white">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                <Settings className="h-4 w-4" />
                            </Button>

                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
                                <Maximize2 className="h-4 w-4" />
                            </Button>

                            <span className="text-sm text-white">Velocidad: 1x</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lesson Title */}

        </div>
    )
}
