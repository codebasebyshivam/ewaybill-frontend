import React, { lazy, Suspense } from "react";
const StickyHeaderSkeleton = lazy(()=> import("./StickyHeaderSkeleton"));
const HeroSkeleton = lazy(()=> import('./HeroSkeleton'));
const StatsSkeleton = lazy(()=> import('./StatsSkeleton'));
const FlowStepsSkeleton = lazy(()=> import('./FlowStepsSkeleton'));
const ServicesSkeleton = lazy(()=> import('./ServicesSkeleton'));

const HomePageSkeleton = () => (
    <main className="min-h-[100dvh] relative  overflow-hidden">
        <StickyHeaderSkeleton />
        <div className="relative z-10 px-6 md:px-12 py-16">
            <HeroSkeleton />
            <StatsSkeleton />
            <FlowStepsSkeleton />
            <ServicesSkeleton />
        </div>
    </main>
);

export default HomePageSkeleton; 