'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Shield, 
  Globe, 
  Zap, 
  Star, 
  ArrowRight,
  Play,
  CheckCircle,
  Volume2,
  Lock,
  Users,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building,
  ShieldHalf,
  Eye,
  FileKey,
  Scan,
  Sparkles,
  Brain,
  Satellite,
  Rocket
} from 'lucide-react';

const fixedParticles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${(i * 7 + 5) % 95}%`,
  top: `${(i * 11 + 10) % 90}%`,
  delay: (i * 0.4) % 3
}));

const voiceData = {
  monthlyGrowth: [65, 78, 92, 85, 95, 110, 125, 140, 160, 185, 210, 245],
  userAdoption: [12000, 45000, 125000, 280000, 550000, 850000, 1200000, 1800000, 2500000],
  transactionVolume: [2.5, 3.8, 5.2, 7.1, 9.5, 12.8, 15.6, 18.9, 22.4, 26.8, 30.2, 35.7],
  accuracyRate: [92.5, 94.2, 95.8, 96.3, 97.1, 97.8, 98.2, 98.7, 99.1, 99.4, 99.6, 99.8]
};

const AnimatedBarChart = ({ data, color, height = 200 }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end justify-between space-x-2 h-48">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: (value / maxValue) * height }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className={`flex-1 ${color} rounded-t-lg relative group`}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {value}%
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedLineChart = ({ data, color, height = 200 }) => {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 100
  }));

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="relative h-48">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d={pathData}
          stroke={color}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
};

const RadialProgress = ({ value, color, size = 120 }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeOut" }}
          className={color}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900">{value}%</span>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Starter",
      price: "₹0",
      period: "forever",
      description: "Perfect for individual users",
      features: [
        "Up to 50 transactions/month",
        "Basic voice commands",
        "Standard security",
        "Email support"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Professional",
      price: "₹4,999",
      period: "per month",
      description: "For growing businesses",
      features: [
        "Up to 1000 transactions/month",
        "Advanced voice AI",
        "Priority support",
        "Custom commands",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored",
      description: "For large organizations",
      features: [
        "Unlimited transactions",
        "Dedicated AI model",
        "24/7 phone support",
        "SLA guarantee",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="relative py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl px-6 py-4 border border-blue-200/50 mb-6"
          >
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">SIMPLE PRICING</span>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VoicePay Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start with our free plan and upgrade as you grow. All plans include our core AI voice technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 border-2 ${
                plan.popular 
                  ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-white shadow-2xl' 
                  : 'border-gray-200 bg-white shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center space-x-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== 'forever' && plan.period !== 'tailored' && (
                    <span className="text-gray-600">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function VoicePayEnterprise() {
  const [isListening, setIsListening] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [showVoiceResponse, setShowVoiceResponse] = useState(false);

  const voiceCommands = [
    "Send ₹5000 to vendor payment",
    "Pay electricity bill for March",
    "Check current account balance",
    "Transfer ₹10000 to savings",
    "Show last week transactions",
    "Pay credit card bill"
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!isMounted) return;
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isMounted]);

  const handleVoiceCommand = () => {
    setIsListening(true);
    const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
    setVoiceCommand(randomCommand);
    
    setTimeout(() => {
      setIsListening(false);
      setShowVoiceResponse(true);
      setTimeout(() => setShowVoiceResponse(false), 3000);
    }, 3000);
  };

  const stats = [
    { 
      icon: <Users className="w-6 h-6" />, 
      value: "2.5M+", 
      label: "Active Users", 
      change: "+45%", 
      trend: "up",
      description: "Growing at 15% monthly"
    },
    { 
      icon: <TrendingUp className="w-6 h-6" />, 
      value: "₹15Cr+", 
      label: "Processed Daily", 
      change: "+32%", 
      trend: "up",
      description: "Across 150+ banks"
    },
    { 
      icon: <Clock className="w-6 h-6" />, 
      value: "1.8s", 
      label: "Avg. Transaction", 
      change: "-0.5s", 
      trend: "down",
      description: "Faster than typing"
    },
    { 
      icon: <Building className="w-6 h-6" />, 
      value: "200+", 
      label: "Enterprise Clients", 
      change: "+28%", 
      trend: "up",
      description: "Including top banks"
    }
  ];

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Neural Voice AI",
      description: "Advanced deep learning models with 99.7% accuracy in understanding natural language and regional accents.",
      stats: "Processes 10K+ voice patterns",
      color: "from-purple-600 to-pink-600",
      gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200",
      features: ["Context Awareness", "Emotion Detection", "Multi-intent Commands"],
      visualization: "accuracy",
      data: voiceData.accuracyRate
    },
    {
      icon: <Satellite className="w-12 h-12" />,
      title: "Real-time Analytics",
      description: "Live monitoring and predictive analytics that provide insights into transaction patterns and user behavior.",
      stats: "Monitors 1M+ data points",
      color: "from-blue-600 to-cyan-600",
      gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200",
      features: ["Live Dashboards", "Predictive Insights", "Behavior Analysis"],
      visualization: "growth",
      data: voiceData.monthlyGrowth
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Quantum Processing",
      description: "Lightning-fast transaction engine capable of handling millions of concurrent voice requests with zero latency.",
      stats: "50K Transactions/Second",
      color: "from-orange-600 to-red-600",
      gradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-200",
      features: ["Zero Latency", "Massive Scalability", "Instant Settlement"],
      visualization: "volume",
      data: voiceData.transactionVolume
    },
    {
      icon: <ShieldHalf className="w-12 h-12" />,
      title: "Blockchain Security",
      description: "Military-grade encryption combined with blockchain technology for immutable transaction records.",
      stats: "99.99% Uptime SLA",
      color: "from-emerald-600 to-teal-600",
      gradient: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200",
      features: ["Quantum Encryption", "Immutable Ledger", "Real-time Auditing"],
      visualization: "adoption",
      data: voiceData.userAdoption
    }
  ];

  const securityFeatures = [
    { 
      icon: <FileKey className="w-10 h-10" />,
      name: "Quantum Encryption", 
      description: "Post-quantum cryptographic algorithms resistant to future computational attacks",
      compliance: ["NIST PQC", "FIPS 140-3", "ISO 27001"],
      level: "99.99% Secure"
    },
    { 
      icon: <Shield className="w-10 h-10" />,
      name: "Voice Biometrics", 
      description: "Multi-factor voice authentication with 99.9% accuracy across diverse accents",
      compliance: ["FIDO2", "WebAuthn", "Biometric ISO"],
      level: "99.9% Accuracy"
    },
    { 
      icon: <Eye className="w-10 h-10" />,
      name: "AI Threat Detection", 
      description: "Real-time machine learning models that detect and prevent fraudulent activities",
      compliance: ["SOC 2", "GDPR", "PCI DSS 4.0"],
      level: "Real-time Protection"
    },
    { 
      icon: <Scan className="w-10 h-10" />,
      name: "Blockchain Audit", 
      description: "Immutable transaction records using distributed ledger technology",
      compliance: ["DLT Framework", "Cryptographic Standards", "Audit Trail"],
      level: "100% Traceable"
    }
  ];

  const testimonials = [
    {
      text: "VoicePay's neural AI understood our regional accents perfectly. We reduced transaction errors by 92% and improved customer satisfaction scores from 3.8 to 4.9 stars in just 3 months!",
      author: "Dr. Ananya Sharma",
      role: "Head of Digital Transformation, State Bank of India",
      location: "Mumbai",
      rating: 5,
      avatar: "🏦",
      metrics: ["92% Error Reduction", "4.9★ Satisfaction", "3M+ Users"],
      impact: "Transformed rural banking"
    },
    {
      text: "The real-time fraud detection saved us ₹2.8 Crores in potential losses last quarter. VoicePay's security is years ahead of anything else in the market.",
      author: "Rohan Malhotra",
      role: "CISO, HDFC Bank",
      location: "Delhi",
      rating: 5,
      avatar: "🔒",
      metrics: ["₹2.8Cr Saved", "99.97% Accuracy", "Zero Breaches"],
      impact: "Revolutionized security"
    },
    {
      text: "Our transaction processing time went from 45 seconds to 1.8 seconds. The quantum engine handles Diwali-level traffic every day without breaking a sweat.",
      author: "Priya Kapoor",
      role: "CTO, ICICI Bank",
      location: "Bangalore",
      rating: 5,
      avatar: "⚡",
      metrics: ["96% Faster", "50K TPS", "24/7 Uptime"],
      impact: "Redefined performance"
    }
  ];

  const complianceBadges = [
    { name: "PCI DSS 4.0", icon: "🛡️", level: "Level 1" },
    { name: "ISO 27001:2022", icon: "📜", level: "Certified" },
    { name: "SOC 2 Type II", icon: "🔒", level: "Compliant" },
    { name: "GDPR & CCPA", icon: "🌐", level: "Certified" },
    { name: "RBI Empaneled", icon: "🏦", level: "Approved" },
    { name: "FIDO2 Certified", icon: "🔑", level: "Enterprise" }
  ];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Volume2 className="w-10 h-10 text-white" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-lg font-medium"
          >
            Initializing VoicePay AI...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-purple-50/70" />
        
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {isMounted && fixedParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"
            animate={{
              y: [0, -120, 0],
              x: [0, 60, 0],
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: particle.delay,
            }}
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 border-2 border-blue-200/30 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-2xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl"
              >
                <Volume2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <motion.span 
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  VoicePay
                </motion.span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-blue-600 font-semibold">AI Banking Revolution</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-8"
            >
              {['Platform', 'Solutions', 'Security', 'Enterprise', 'Developers'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ y: -2 }}
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-sm group relative"
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                    initial={false}
                  />
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-sm hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border border-blue-500/20 flex items-center space-x-2"
              >
                <Rocket className="w-4 h-4" />
                <span>Start Free Trial</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left space-y-8"
          >

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight">
                The Future of
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Voice Banking
                </span>
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Experience India's first neural AI-powered voice banking platform. 
                Speak naturally, bank securely, and transform your financial operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {stat.icon}
                    </div>
                    <div className={`text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-emerald-600' : 'text-blue-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm mb-2">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
                    <motion.div 
                      className={`h-1 rounded-full ${
                        stat.trend === 'up' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: stat.trend === 'up' ? '85%' : '75%' }}
                      transition={{ delay: 1 + index * 0.2, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border border-blue-500/20 flex items-center justify-center space-x-3"
              >
                <Sparkles className="w-6 h-6" />
                <span>Start AI Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 border-2 border-gray-300 rounded-2xl text-gray-700 font-semibold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
              >
                <Play className="w-6 h-6" />
                <span>Watch Revolution</span>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-20"
              >
                <div className="relative w-96 h-[600px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] border-[16px] border-gray-700 shadow-2xl">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-gray-800 rounded-b-3xl z-10" />
                    
                    <div className="absolute inset-2 bg-gradient-to-br from-gray-800 to-blue-900 rounded-[2.2rem] overflow-hidden border border-gray-600">
                      <div className="flex justify-between items-center px-6 py-4 text-xs text-gray-400 bg-gray-800/50">
                        <div>9:41</div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                          <span>VoicePay AI</span>
                        </div>
                      </div>

                      <div className="flex justify-center items-end space-x-1 h-48 px-8">
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 bg-gradient-to-t from-blue-400 to-purple-500 rounded-t-lg"
                            animate={{
                              height: isListening ? 
                                [20, Math.random() * 80 + 40, 20] : 
                                [10, Math.random() * 30 + 10, 10],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>

                      <div className="text-center px-8 mb-8">
                        <motion.div
                          animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
                          transition={{ duration: 2, repeat: isListening ? Infinity : 0 }}
                          className="mb-4"
                        >
                          <div className="relative">
                            <Mic className={`w-16 h-16 mx-auto ${
                              isListening ? 'text-emerald-400' : 'text-blue-400'
                            }`} />
                            {isListening && (
                              <motion.div
                                className="absolute inset-0 bg-emerald-400 rounded-full opacity-20"
                                animate={{ scale: [1, 2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                        </motion.div>
                        
                        <AnimatePresence>
                          {isListening ? (
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-lg font-semibold text-gray-200 mb-2"
                            >
                              Listening: "{voiceCommand}"
                            </motion.p>
                          ) : (
                            <motion.p
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-lg font-semibold text-gray-200 mb-2"
                            >
                              Ready for Voice Command
                            </motion.p>
                          )}
                        </AnimatePresence>
                        
                        <p className="text-sm text-gray-400">
                          Try: "Send money to savings account"
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 px-8">
                        {[
                          { name: 'Send Money', icon: '💸' },
                          { name: 'Pay Bills', icon: '🧾' },
                          { name: 'Check Balance', icon: '💰' },
                          { name: 'Invest', icon: '📈' }
                        ].map((action) => (
                          <motion.button
                            key={action.name}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gray-700/50 rounded-xl p-4 text-center text-gray-300 border border-gray-600 hover:border-blue-400 transition-all"
                          >
                            <div className="text-2xl mb-2">{action.icon}</div>
                            <div className="text-sm">{action.name}</div>
                            <div className="text-xs text-gray-500">Voice enabled</div>
                          </motion.button>
                        ))}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span>Neural AI Active</span>
                          </div>
                          <span>99.97% Accuracy</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-6 -right-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-2xl border border-emerald-400/30"
                  >
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    className="absolute -bottom-6 -left-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl border border-purple-400/30"
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.button
                onClick={handleVoiceCommand}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-12 py-5 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 border-2 ${
                  isListening 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-400/50 shadow-emerald-500/30' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400/50 shadow-blue-500/30'
                }`}
              >
                <div className="flex items-center space-x-3 ">
                  <Mic className="w-6 h-6" />
                  <span className="text-lg pt-32">
                    {isListening ? 'AI Processing...' : 'Start Voice AI'}
                  </span>
                </div>
              </motion.button>

              <AnimatePresence>
                {showVoiceResponse && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-2xl shadow-2xl border border-emerald-400/30"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Payment Successful! ₹5,000 transferred</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl px-6 py-4 border border-purple-200/50 mb-6"
            >
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-semibold text-purple-600">NEURAL AI PLATFORM</span>
            </motion.div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Powered by Advanced
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Neural Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our cutting-edge AI understands not just words, but context, emotions, and complex financial intents 
              with human-like comprehension and lightning-fast processing.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
                className={`p-10 rounded-3xl ${feature.gradient} backdrop-blur-lg border border-gray-200/50 shadow-2xl cursor-pointer transition-all duration-500 group relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-purple-600 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      {feature.stats}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    {feature.visualization === 'accuracy' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Accuracy Growth</span>
                          <span className="text-sm font-semibold text-purple-600">99.8%</span>
                        </div>
                        <AnimatedLineChart 
                          data={feature.data} 
                          color="#8B5CF6" 
                          height={80}
                        />
                      </div>
                    )}
                    {feature.visualization === 'growth' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Monthly Growth</span>
                          <span className="text-sm font-semibold text-blue-600">+245%</span>
                        </div>
                        <AnimatedBarChart 
                          data={feature.data} 
                          color="bg-gradient-to-t from-blue-500 to-cyan-500" 
                          height={80}
                        />
                      </div>
                    )}
                    {feature.visualization === 'volume' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Transaction Volume (Cr)</span>
                          <span className="text-sm font-semibold text-orange-600">₹35.7Cr</span>
                        </div>
                        <AnimatedBarChart 
                          data={feature.data} 
                          color="bg-gradient-to-t from-orange-500 to-red-500" 
                          height={80}
                        />
                      </div>
                    )}
                    {feature.visualization === 'adoption' && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">User Adoption</span>
                          <span className="text-sm font-semibold text-emerald-600">2.5M+</span>
                        </div>
                        <AnimatedLineChart 
                          data={feature.data} 
                          color="#10B981" 
                          height={80}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {feature.features.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-3 text-gray-700 text-base"
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200/50 p-12 shadow-2xl"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Enterprise Security
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Metrics
                </span>
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our multi-layered security architecture ensures your financial data remains protected with 
                the highest standards in the industry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="text-center p-8 bg-white rounded-2xl border border-gray-200/50 hover:border-emerald-300 transition-all duration-300 group shadow-2xl"
                >
                  <div className="relative mb-6 flex justify-center">
                    <RadialProgress 
                      value={feature.level.includes('99.99') ? 99.99 : 
                             feature.level.includes('99.9') ? 99.9 : 
                             feature.level.includes('100') ? 100 : 95} 
                      color="text-emerald-500"
                      size={100}
                    />
                  </div>
                  
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex justify-center space-x-2 mb-4">
                    {feature.compliance.map((comp, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border">
                        {comp}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-emerald-600 font-semibold text-sm">
                    {feature.level}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Trusted by
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of enterprises that have transformed their banking operations with VoicePay's neural AI platform.
            </p>
          </motion.div>

          <div className="relative h-[500px] mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 backdrop-blur-lg rounded-4xl border border-gray-200/50 p-12 shadow-2xl"
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex text-yellow-400 mb-8">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-3xl lg:text-4xl text-gray-800 italic leading-relaxed mb-12 font-light">
                    "{testimonials[activeTestimonial].text}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="text-5xl">{testimonials[activeTestimonial].avatar}</div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {testimonials[activeTestimonial].author}
                        </div>
                        <div className="text-lg text-gray-600">
                          {testimonials[activeTestimonial].role}
                        </div>
                        <div className="text-gray-500">
                          {testimonials[activeTestimonial].location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-3">Key Impact:</div>
                      <div className="flex space-x-3">
                        {testimonials[activeTestimonial].metrics.map((metric, i) => (
                          <span key={i} className="text-sm bg-white text-gray-700 px-4 py-2 rounded-full border border-gray-200 shadow-lg">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-4">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-4 h-4 rounded-full transition-all ${
                  activeTestimonial === index 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-12 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="relative py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-16 bg-white/80 backdrop-blur-xl rounded-4xl border border-gray-200/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-emerald-500/10 to-teal-500/10 rounded-full translate-x-24 translate-y-24" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl px-6 py-3 border border-blue-200/50 mb-8"
              >
                <Rocket className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">READY FOR REVOLUTION?</span>
              </motion.div>

              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                Start Your
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Journey
                </span>
              </h2>
              
              <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the future of voice banking today. Experience the power of neural AI 
                and transform how you interact with your finances.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-14 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 border border-blue-500/20 flex items-center justify-center space-x-3"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Start Free AI Trial</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-14 py-5 border-2 border-gray-300 rounded-2xl text-gray-700 font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg"
                >
                  <Play className="w-6 h-6" />
                  <span>Watch AI Demo</span>
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                {[
                  { value: "30-day", label: "Free Trial" },
                  { value: "24/7", label: "AI Support" },
                  { value: "Zero", label: "Setup Fee" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                    <div className="text-gray-600 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative border-t border-gray-200/50 py-20 px-6 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4 mb-8"
              >
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900">VoicePay AI</span>
                  <div className="text-sm text-blue-600 font-semibold">Neural Banking Platform</div>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 max-w-md leading-relaxed text-lg"
              >
                Revolutionizing financial interactions through advanced neural AI and voice technology. 
                Making banking smarter, faster, and more intuitive for everyone.
              </motion.p>
            </div>
            
            {[
              {
                title: "AI Platform",
                items: ["Voice Intelligence", "Neural Networks", "API Access", "Developer Tools", "Analytics"]
              },
              {
                title: "Solutions",
                items: ["Enterprise Banking", "Retail Finance", "Government", "Startups", "Developers"]
              },
              {
                title: "Resources",
                items: ["Documentation", "API Reference", "Security", "Compliance", "Support"]
              }
            ].map((column, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 2) * 0.1 }}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-6">{column.title}</h4>
                <ul className="space-y-4">
                  {column.items.map((item, i) => (
                    <li key={i}>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium group flex items-center space-x-2">
                        <div className="w-0 group-hover:w-3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" />
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200/50 pt-12 flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-gray-500 text-lg mb-6 md:mb-0">
              © 2024 VoicePay AI Technologies. All rights reserved.
            </div>
            <div className="flex space-x-8 text-gray-500 text-lg">
              {['Privacy', 'Terms', 'Security', 'Compliance'].map((item) => (
                <button key={item} className="hover:text-gray-900 transition-colors font-medium">
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}