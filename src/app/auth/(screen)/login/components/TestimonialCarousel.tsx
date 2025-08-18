'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { Testimonial } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [initialRender, setInitialRender] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const totalTestimonials = testimonials.length;

    const cardVariants = {
        initial: (direction: 'left' | 'right') => ({
            x: direction === 'left' ? '100%' : '-100%',
            opacity: 0,
            width: '100%',
        }),
        animate: {
            x: '0%',
            opacity: 1,
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.1 }
            },
            transitionEnd: {
                position: 'relative',
            }
        },
        exit: (direction: 'left' | 'right') => ({
            x: direction === 'left' ? '-100%' : '100%',
            opacity: 0,
            width: '100%',
            transition: {
                x: { type: 'spring' as const, stiffness: 300, damping: 30 },
                opacity: { duration: 0.1 }
            },
            transitionEnd: {
                position: 'absolute', // Ensure it's absolute when exiting
            }
        })
    };

    const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('left'); // Default for auto-advance

    // Auto-advance mechanism
    useEffect(() => {
        // Only set initialRender to false after the first render cycle
        if (initialRender) {
            setInitialRender(false);
        }

        timeoutRef.current = setInterval(() => {
            setAnimationDirection('left'); // For auto-advance, new card comes from right
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
        }, 7000); // Change testimonial every 7 seconds

        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
            }
        };
    }, [totalTestimonials, initialRender]);

    const handleDotClick = (index: number) => {
        if (index === currentIndex) return; // No change needed

        // Determine direction for manual clicks
        if (index > currentIndex) {
            setAnimationDirection('left'); // New card comes from right
        } else {
            setAnimationDirection('right'); // New card comes from left
        }

        setCurrentIndex(index);

        // Reset auto-advance timer on manual interaction
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = setInterval(() => {
                setAnimationDirection('left');
                setCurrentIndex((prevIndex) => (prevIndex + 1) % totalTestimonials);
            }, 7000);
        }
    };

    const currentTestimonial = testimonials[currentIndex];


    return (
        <div className="relative w-full max-w-screen-xl mx-auto flex items-center justify-center">

            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
                <div className="relative w-full max-w-lg mx-auto overflow-hidden">
                    <AnimatePresence initial={!initialRender} custom={animationDirection}> {/* initial={false} to prevent animation on first load */}
                        <motion.div
                            key={currentTestimonial.id}
                            custom={animationDirection}
                            variants={cardVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <TestimonialCard {...currentTestimonial} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-4 flex space-x-2 relative z-20">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-24 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-purple-400' : 'bg-white/10'
                                }`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}