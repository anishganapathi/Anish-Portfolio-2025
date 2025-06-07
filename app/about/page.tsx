import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export default function AboutPage() {
  const timelineData = [
    {
      title: "Present",
      content: (
        <div className="space-y-6">
          <p className="text-neutral-700 dark:text-neutral-300">
            Currently pursuing my masters in computer science at stevens institute of technology.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/stevens1.jpg"
              alt="stevens1"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/stevens2.jpg"
              alt="stevens2"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
          </div>
        </div>
      ),
    },
    {
        title: "Jan 2025",
        content: (
          <div className="space-y-6">
            <p className="text-neutral-700 dark:text-neutral-300">
              Worked on a project called "TRAVIZ" which is a cost effective application for public transportation
            </p>
            <div className="grid grid-cols-2 gap-4">
             <Image
                src="/Traviz1.jpg"
                alt="Traviz1"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
              <Image
                src="/Traviz2.png"
                alt="Traviz2"
                width={400}
                height={300}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800"
              />
            </div>
          </div>
        ),
      },
    {
      title: "Early 2024",
      content: (
        <div className="space-y-6">
          <p className="text-neutral-700 dark:text-neutral-300">
          In early 2024, I developed my university’s event website, VITOPIA, and also designed the user interface for its mobile application.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
          It is a 2-day event that includes ticket booking, merchandise purchases, and browsing the various events throughout the day. The entire application handled over 15,000 users and generated more than ₹1.5 crore in revenue for the university.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/Vitopia1.png"
              alt="Vitopia1"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/Vitopia2.jpg"
              alt="Vitopia2"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/Vitopia3.jpg"
              alt="Vitopia3"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />

            <Image
              src="/Vitopia4.png"
              alt="Vitopia3"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            /> 
          </div>
        </div>
      ),
    },
    {
      title: "In Between",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Developed few projects during my bachelors.
          </p>
          <ul className="list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>✅ Developed Skin cancer prediction analysis as a capstone project.</li>
            <li>✅ Completed an internship on cybersecurity (Cranes Varsity).</li>
            <li>✅ Built a website on a fashion brand.</li>
            <li>✅ Designed a User Interface for a mobile application about Tiger Reserve.</li>
            <li>✅ Completed few certifications on AI and Machine Learning.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <Timeline data={timelineData} />
    </main>
  );
}
