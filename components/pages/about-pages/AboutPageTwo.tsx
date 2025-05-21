'use client'

import Image from 'next/image'
import { CreditCard, Clock, Store } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card' // pastikan file ini memang ada

const stats = [
  { label: "Products", value: "50+", description: "Premium electronic products" },
  { label: "Revenue", value: "3M+", description: "Annual revenue in electronics sales" },
  { label: "Customers", value: "100+", description: "Satisfied global customers" },
]

const team = [
  {
    name: "Fanidyasani Atantya",
    role: "CEO & Founder",
    image: "/images/people/person.jpg",
    description: "15+ years of experience in consumer electronics and retail technology."
  },
  {
    name: "Sion Felix Saragih",
    role: "CTO",
    image: "/images/people/person.jpg",
    description: "Expert in VR/AR technology and emerging tech trends."
  },
  {
    name: "Moch Alif Budi Setyawan",
    role: "Head of Sales",
    image: "/images/people/person.jpg",
    description: "Specializes in enterprise solutions and customer relations."
  }
]

const steps = [
  {
    icon: Store,
    title: "Visit Our Store",
    description: "Come to our physical store to see and try our products directly. Our team is ready to help you choose the right product."
  },
  {
    icon: Clock,
    title: "Operating Hours",
    description: "We are open Monday-Saturday, 09:00-21:00. Sundays and holidays 10:00-20:00."
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    description: "We accept cash, debit/credit cards, and bank transfers. Payments can be made directly at the store."
  }
]

export default function AboutPageTwo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Our Story */}
      <div className="mb-24">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          At NexGen Electronics, we're passionate about the future. Our story began with a vision to integrate the latest innovations into everyday life.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          From humble beginnings, we’ve grown into a trusted leader in VR, AR, and smart technologies, driven by our commitment to excellence.
        </p>
      </div>

      {/* Our Team */}
      <div className="mb-24">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-[16rem]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Stats Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">{stat.label}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Buy Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How to Buy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-md border-none">
              <CardHeader>
                <step.icon className="w-10 h-10 text-gray-900 dark:text-white mb-4" />
                <CardTitle className="text-gray-900 dark:text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
