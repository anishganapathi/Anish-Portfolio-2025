"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  href?: string;
  email?: string;
  phone?: string;
}

const contacts: Contact[] = [
  {
    name: "ani.__sh",
    location: "Aɴɪsʜ G",
    followers: "205",
    following: "188",
    avatar: "/avatars/AniAvatar.png",
    type: "profile",
    href: "https://instagram.com/ani.__sh",
  },
  {
    name: "Masters 2025 - 2027",
    location: "Stevens Institute of Technology",
    type: "location",
    avatar: "/avatars/Stevens.png",
    href: "https://www.google.com/maps/place/Stevens+Institute+of+Technology/data=!4m2!3m1!1s0x0:0x52b7295ea9b98396?sa=X&ved=1t:2428&ictx=111",
  },
  {
    name: "My Projects",
    location: "Github",
    type: "company",
    avatar: "/avatars/Github.png",
    href: "https://github.com/anishganapathi",
  },
  {
    name: "Skin Disease Diagnosis",
    subtitle: "GUI based application",
    type: "project",
    avatar: "/avatars/Github.png",
    href: "https://github.com/anishganapathi/Skin-Disease-Diagnosis",
  },
  {
    name: "Contact Me",
    location: "anishganapathi@gmail.com",
    type: "contact",
    avatar: "/avatars/Email.png",
    email: "anishganapathi@gmail.com",
    phone: "+91 9800000000",
  },
  {
    name: "Connect on LinkedIn",
    location: "LinkedIn Profile",
    type: "booking",
    avatar: "/avatars/Linkedin.png",
    href: "https://www.linkedin.com/in/anish-ganapathi-086049220",
  },
  {
    name: "Design Mockups",
    location: "Figma",
    type: "tools",
    avatar: "/avatars/Figma.png",
    tools: ["A", "S", "Y"],
    href: "https://www.figma.com/design/SIPvzjNVRCsqyoxH47zF59/Device-Mockups--Community-?node-id=160-452&m=dev&t=UAEplwa41fzukK7W-1",
  },
];

export default function ContactPage() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <main className="min-h-screen w-full py-32 px-4 md:px-6 bg-[#0a0a0a]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={`${contact.name}-${index}`}
            variants={cardVariants}
            whileHover="hover"
            className="cursor-pointer"
          >
            <Card className="bg-[#111111] rounded-[20px] border border-[#ffffff1a] shadow-lg backdrop-blur-sm hover:border-[#ffffff33] transition-colors">
              <CardContent className={`p-4 ${contact.type === "profile" ? "pb-6" : ""}`}>
                <div className="flex items-start justify-between">
                  <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3">
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
                  </Link>
                  {contact.time && (
                    <span className="text-sm text-gray-400">
                      {contact.time}
                    </span>
                  )}
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
                    <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                      <Button 
                        className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer" 
                        variant="default"
                      >
                        FOLLOW
                      </Button>
                    </Link>
                  </div>
                )}

                {contact.type === "project" && (
                  <div className="mt-4">
                    <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer">
                        View Project
                      </Button>
                    </Link>
                  </div>
                )}

                {contact.type === "location" && (
                  <div className="mt-4">
                    <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer">
                        View Location
                      </Button>
                    </Link>
                  </div>
                )}

                {contact.type === "company" && (
                  <div className="mt-4">
                    <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer">
                        View Projects
                      </Button>
                    </Link>
                  </div>
                )}

                {contact.type === "tools" && contact.tools && (
                  <>
                    <div className="mt-4 flex gap-2">
                      {contact.tools.map((tool, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center text-sm font-medium border border-[#ffffff1a]"
                        >
                          {tool}
                        </div>
                      ))}
                      <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                        <button className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222222] transition-colors border border-[#ffffff1a]">
                          <Plus className="h-4 w-4 text-gray-400" />
                        </button>
                      </Link>
                    </div>
                    <div className="mt-4">
                      <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer">
                          View Designs
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                {contact.type === "contact" && (
                  <div className="mt-4 flex gap-2">
                    <Button 
                      onClick={() => contact.phone && handleCall(contact.phone)}
                      className="flex-1 bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer"
                    >
                      Call
                    </Button>
                    <Button 
                      onClick={() => contact.email && handleEmail(contact.email)}
                      className="flex-1 bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer"
                    >
                      Message
                    </Button>
                  </div>
                )}

                {contact.type === "booking" && (
                  <div className="mt-4">
                    <Link href={contact.href || "#"} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#1a1a1a] text-white hover:bg-[#222222] border border-[#ffffff1a] transition-colors cursor-pointer">
                        Connect
                      </Button>
                    </Link>
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
