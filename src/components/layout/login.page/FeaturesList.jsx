import React, { useEffect, useState, useMemo,memo } from 'react';
import {
    Zap,
    CreditCard,
    Truck,
    Building,
    UserPlus,
    LogIn,
    CheckCircle,
    AlertCircle,
    ArrowLeftCircleIcon,
    ArrowLeft,
  } from 'lucide-react';
// Memoized Feature Card component
const FeatureCard = memo(({ feature, isActive }) => {
    const Icon = feature.icon;
    return (
        <div
            className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-500 transform ${isActive ? 'scale-105 bg-white/20 shadow-lg' : 'hover:bg-white/15'
                }`}
        >
            <div className="flex flex-col items-center text-center space-y-3">
                <div
                    className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/30 scale-110' : ''
                        }`}
                >
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-green-100 text-sm mt-1">{feature.desc}</p>
                </div>
            </div>
        </div>
    );
});

const features = [
    {
        icon: CreditCard,
        title: 'Driving License',
        desc: 'Digital transport documents',
        color: 'from-blue-500 to-blue-600',
        stats: '50K+ users',
    },
    {
        icon: Zap,
        title: 'FASTag',
        desc: 'Seamless toll payments',
        color: 'from-yellow-500 to-yellow-600',
        stats: '1M+ transactions',
    },
    {
        icon: Truck,
        title: 'RC',
        desc: 'Vehicle registration',
        color: 'from-purple-500 to-purple-600',
        stats: '25K+ vehicles',
    },
    {
        icon: Building,
        title: 'Challan',
        desc: 'Traffic violation management',
        color: 'from-red-500 to-red-600',
        stats: '10K+ resolved',
    },
];

export default function FeaturesList() {
    const [currentFeature, setCurrentFeature] = useState(0);

    // Memoize the feature indicators so they don't re-render unnecessarily
    const featureIndicators = useMemo(() => {
        return features.map((_, index) => (
            <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentFeature ? 'bg-white w-6' : 'bg-white/40'
                    }`}
            />
        ));
    }, [currentFeature]);


    // Cycle features every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);



    return (
        <>
            <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                        isActive={index === currentFeature}
                    />
                ))}
            </div>

            <div className="flex justify-center space-x-2 mb-8">
                {featureIndicators}
            </div>
        </>
    )
}
