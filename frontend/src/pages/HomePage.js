import React from 'react';
import { ArrowRight, Activity, Car, Camera, Brain, BarChart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#0F172A]">
      {/* Hero Section */}
      <div className="w-screen relative">
        <div className="w-full px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Traffic
              <span className="text-blue-400">IQ.</span>
            </h1>
            <p className="text-2xl text-blue-200 mb-8 px-4">
              AI-Powered Intelligent Traffic Monitoring System
            </p>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 px-4">
              Transform urban mobility with real-time traffic analysis, predictive congestion
              control, and intelligent monitoring capabilities.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center mx-auto">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-screen bg-[#0F172A] px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <FeatureCard
            icon={<Camera className="h-8 w-8 text-blue-400" />}
            title="Real-time Monitoring"
            description="Advanced computer vision technology for continuous traffic surveillance and analysis"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-blue-400" />}
            title="AI-Powered Analysis"
            description="Deep learning algorithms for accurate vehicle detection and pattern recognition"
          />
          <FeatureCard
            icon={<Car className="h-8 w-8 text-blue-400" />}
            title="Vehicle Tracking"
            description="Precise monitoring of vehicle flow, speed, and lane-wise movement"
          />
          <FeatureCard
            icon={<Activity className="h-8 w-8 text-blue-400" />}
            title="Congestion Prevention"
            description="Predictive analytics to identify and prevent traffic bottlenecks"
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8 text-blue-400" />}
            title="Data Insights"
            description="Comprehensive analytics dashboard for informed decision-making"
          />
          <FeatureCard
            icon={<Camera className="h-8 w-8 text-blue-400" />}
            title="Smart Alerts"
            description="Instant notifications for traffic incidents and unusual patterns"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-screen bg-[#1E293B] py-16">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard number="95%" text="Accuracy in Vehicle Detection" />
            <StatCard number="30%" text="Reduction in Traffic Congestion" />
            <StatCard number="24/7" text="Real-time Monitoring" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#1E293B] p-6 rounded-xl hover:bg-slate-700 transition-colors duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  );
};

const StatCard = ({ number, text }) => {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-blue-400 mb-2">{number}</div>
      <div className="text-slate-300">{text}</div>
    </div>
  );
};

export default HomePage;