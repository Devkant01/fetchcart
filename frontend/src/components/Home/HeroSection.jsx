import React from 'react'
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { CardContent } from '../common/CardContent';


function HeroSection() {
    return (
        <section className="w-[85%] max-w-6xl text-center py-16">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6"
            >
                Welcome to <span className="text-blue-600">FetchCart</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
            >
                A developer’s tool to fetch high-quality product images, metadata, and category-based content effortlessly for your e-commerce projects.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 flex flex-wrap gap-4 justify-center"
            >
                <Button>Start for Free</Button>
                <Button variant="outline">Explore APIs</Button>
            </motion.div>
        </section>
    )
}

export default HeroSection      