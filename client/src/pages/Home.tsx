import { motion } from "framer-motion";
import CVForm from "@/components/CVForm";
import {
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  Users,
  Star,
} from "lucide-react";
import generatedImage from "@assets/generated_images/abstract_professional_blue_geometric_background.png";

const requirements = [
  { icon: Calendar, text: "Designing AI-powered workflows and automation strategies" },
  { icon: FileText, text: "Building and maintaining intelligent process automations" },
  { icon: MessageSquare, text: "Collaborating with teams to improve operational efficiency" },
  { icon: Clock, text: "Optimizing systems for speed, accuracy, and scalability" },
];

const benefits = [
  { label: "Work Environment", value: "Professional & Collaborative" },
  { label: "Work Type", value: "Hybrid" },
  { label: "Employment", value: "Full Time" },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 overflow-hidden font-sans">
      {/* Left Side - Hero */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full lg:w-[55%] p-8 lg:p-14 xl:p-20 flex flex-col justify-center relative z-10"
      >
        <div className="max-w-xl mx-auto lg:mx-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-8 border border-blue-200 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            AI and Automations
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.1]">
            Join Us as a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
              AI and Automations
            </span>
          </h1>

          <p className="text-base lg:text-lg text-slate-500 mb-8 leading-relaxed max-w-md">
            We're looking for a professional, organized, and proactive individual
            to support executive operations in AI and Automations.
          </p>

          {/* Requirements */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Key Responsibilities
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {requirements.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 bg-white rounded-xl p-3 border border-slate-100 shadow-sm"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits row */}
          <div className="flex flex-wrap gap-4 mb-10">
            {benefits.map(({ label, value }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex flex-col"
              >
                <span className="text-xs text-slate-400 uppercase tracking-wide">
                  {label}
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="hidden flex items-center gap-6 border-t border-slate-100 pt-6"
          >
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xl font-bold text-slate-900">200+</p>
                <p className="text-xs text-slate-400">Active Employees</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-xl font-bold text-slate-900">4.8/5</p>
                <p className="text-xs text-slate-400">Workplace Rating</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-xl font-bold text-slate-900">10+ Yrs</p>
              <p className="text-xs text-slate-400">Established</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-[45%] relative flex items-center justify-center p-6 lg:p-10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={generatedImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] lg:backdrop-blur-none lg:bg-gradient-to-l from-blue-900/50 to-slate-50/95" />
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          <CVForm />
        </motion.div>
      </div>
    </div>
  );
}
