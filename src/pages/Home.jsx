import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';
import ProjectCarousel from '../components/ProjectCarousel';
import GetStarted from '../components/GetStarted';

export default function Home() {
    return (
        <main>
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
            <ProjectCarousel />
            <GetStarted />
        </main>
    );
}
