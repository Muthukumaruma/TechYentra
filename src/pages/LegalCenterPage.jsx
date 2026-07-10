import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, Shield, Cookie, RotateCcw, AlertTriangle, BarChart2, Layers, Lock, Eye } from 'lucide-react';

const policies = [
  {
    icon: FileText,
    title: 'Terms & Conditions',
    description: 'Our full service terms covering scope, billing, IP ownership, termination, and governing law for all client engagements.',
    href: '/terms',
    badge: '18 sections',
  },
  {
    icon: Shield,
    title: 'Privacy Policy',
    description: 'How we collect, process, store, and protect your personal data under the DPDPA 2023 and international standards.',
    href: '/privacy',
    badge: 'DPDPA compliant',
  },
  {
    icon: Cookie,
    title: 'Cookie Policy',
    description: 'What cookies and tracking technologies we use on our website and how you can manage your preferences.',
    href: '/cookies',
    badge: null,
  },
  {
    icon: RotateCcw,
    title: 'Refund Policy',
    description: 'Our refund terms for custom development projects, SaaS subscriptions, advance payments, and billing disputes.',
    href: '/refund',
    badge: null,
  },
  {
    icon: AlertTriangle,
    title: 'Acceptable Use Policy',
    description: 'Permitted and prohibited uses of our services, platforms, and APIs — and consequences for violations.',
    href: '/acceptable-use',
    badge: null,
  },
  {
    icon: BarChart2,
    title: 'Service Level Agreement',
    description: 'Our uptime commitments, incident response times, maintenance windows, and SLA credit terms for managed services.',
    href: '/sla',
    badge: '99.5% uptime target',
  },
  {
    icon: Lock,
    title: 'Security Practices',
    description: 'The technical and organisational security controls we maintain to protect client data and our infrastructure.',
    href: '/security',
    badge: null,
  },
  {
    icon: Eye,
    title: 'Responsible Disclosure',
    description: 'Our vulnerability disclosure programme — how to report security issues responsibly and what you can expect in return.',
    href: '/disclosure',
    badge: null,
  },
  {
    icon: Layers,
    title: 'Data Protection Statement',
    description: 'Our obligations as a Data Processor under DPDPA 2023, GDPR principles, and our data retention and deletion practices.',
    href: '/data-protection',
    badge: null,
  },
  {
    icon: FileText,
    title: 'Business Continuity',
    description: 'Our policies for maintaining service delivery during disruptions, disaster recovery, and client communication protocols.',
    href: '/business-continuity',
    badge: null,
  },
];

const trustItems = [
  { label: 'DPIIT Recognised Startup', sub: 'Startup India Programme' },
  { label: 'Udyam MSME Registered', sub: 'Ministry of MSME, Govt. of India' },
  { label: 'CIN: U62011TN2026PTC194186', sub: 'Incorporated under Companies Act, 2013' },
  { label: 'Jurisdiction: Madurai, Tamil Nadu', sub: 'India — disputes governed by Indian law' },
];

export default function LegalCenterPage() {
  return (
    <>
      <Helmet>
        <title>Legal Center — TechYenthra Technologies</title>
        <meta name="description" content="All legal documents for TechYenthra Technologies — Terms & Conditions, Privacy Policy, Refund Policy, SLA, Acceptable Use Policy, Security Practices, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.techyenthra.com/legal" />
      </Helmet>

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
              Transparency &amp; Trust
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Legal Center
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              All policies, agreements, and legal documents governing your relationship with TechYenthra Technologies. We believe in clear, plain-English terms — no surprises.
            </p>
          </motion.div>

          {/* Policy cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {policies.map((policy, i) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={policy.href}
                    className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      {policy.badge && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                          {policy.badge}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {policy.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                      {policy.description}
                    </p>
                    <span className="mt-4 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      Read document →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-6">
              Company &amp; Regulatory Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustItems.map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
              TechYenthra Technologies Private Limited · info@techyenthra.com · +91 81051 77337
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
}
