"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface Contact {
  name: string;
  message?: string;
  time?: string;
  avatar?: string;
  dark?: boolean;
  location?: string;
  followers?: string;
  following?: string;
  subtitle?: string;
  type?: "profile" | "location" | "company" | "project" | "contact" | "booking" | "tools";
  members?: string[];
  tools?: string[];
}

const contacts: Contact[] = [
  {
    name: "Boris Ukhtomsky",
    message: "Nice Work! 👍",
    time: "12:50 PM",
    avatar: "/avatars/boris.jpg",
  },
  {
    name: "Hector Mariano",
    message: "Lorem ipsum dolor 😊",
    time: "02:18 AM",
    avatar: "/avatars/hector.jpg",
    dark: true,
  },
  {
    name: "Yolanda Barrueco",
    location: "Mexico City",
    followers: "250",
    following: "168",
    avatar: "/avatars/yolanda.jpg",
    type: "profile",
  },
  {
    name: "Salomé Fernán",
    location: "Milwaukee",
    type: "location",
  },
  {
    name: "Cardarion Hart",
    location: "Guatemala City",
    type: "company",
  },
  {
    name: "InVision App Design",
    subtitle: "Android App Design",
    type: "project",
    members: ["/avatars/member1.jpg", "/avatars/member2.jpg", "/avatars/member3.jpg"],
  },
  {
    name: "Chomkwan Wattana",
    location: "wattana@gmail.com",
    type: "contact",
  },
  {
    name: "Audi",
    location: "Palo Alto",
    type: "booking",
  },
  {
    name: "Design Tools",
    location: "Nizhny Novgorod",
    type: "tools",
    tools: ["P", "S", "X"],
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full py-32 px-4 md:px-6 bg-[#0a0a0a]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {contacts.map((contact) => (
          <motion.div
            key={contact.name}
            variants={cardVariants}
            whileHover="hover"
            className="cursor-pointer"
          >
            <Card className="bg-[#111111] rounded-[20px] border border-[#ffffff1a] shadow-lg backdrop-blur-sm hover:border-[#ffffff33] transition-colors">
              <CardContent className={`p-4 ${contact.type === "profile" ? "pb-6" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {contact.avatar && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#1a1a1a]">
                        <Image
                          src={contact.avatar}
                          alt={contact.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-[15px] text-white">{contact.name}</h3>
                      {contact.message && (
                        <p className="text-sm mt-0.5 text-gray-400">
                          {contact.message}
                        </p>
                      )}
                      {contact.location && (
                        <p className="text-sm mt-0.5 text-gray-400">{contact.location}</p>
                      )}
                      {contact.subtitle && (
                        <p className="text-sm mt-0.5 text-gray-400">{contact.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {contact.time && (
                      <span className="text-sm text-gray-400">
                        {contact.time}
                      </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-200 transition-colors">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {contact.type === "profile" && (
                  <div className="mt-6">
                    <div className="flex justify-between mb-4">
                      <div className="text-center">
                        <p className="text-[15px] font-medium text-white">{contact.followers}</p>
                        <p className="text-sm text-gray-400">Followers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[15px] font-medium text-white">{contact.following}</p>
                        <p className="text-sm text-gray-400">Following</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors" 
                      variant="default"
                    >
                      FOLLOW
                    </Button>
                  </div>
                )}

                {contact.type === "project" && contact.members && (
                  <div className="mt-4">
                    <div className="flex items-center gap-1">
                      {contact.members.map((member, i) => (
                        <div key={i} className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-[#111111]">
                          <Image
                            src={member}
                            alt="Team member"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <button className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center ml-1 hover:bg-[#222222] transition-colors">
                        <Plus className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                )}

                {contact.type === "tools" && contact.tools && (
                  <div className="mt-4 flex gap-2">
                    {contact.tools.map((tool, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center text-sm font-medium border border-[#ffffff1a]"
                      >
                        {tool}
                      </div>
                    ))}
                    <button className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222222] transition-colors border border-[#ffffff1a]">
                      <Plus className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                )}

                {contact.type === "contact" && (
                  <div className="mt-4 flex gap-2">
                    <Button className="flex-1 bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors">
                      Call
                    </Button>
                    <Button className="flex-1 bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors">
                      Message
                    </Button>
                    <Button size="icon" variant="ghost" className="text-gray-400 hover:text-gray-200 hover:bg-[#222222]">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {contact.type === "booking" && (
                  <div className="mt-4">
                    <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors">
                      Book Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
