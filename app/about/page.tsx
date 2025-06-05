import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export default function AboutPage() {
  const timelineData = [
    {
      title: "2024",
      content: (
        <div className="space-y-6">
          <p className="text-neutral-700 dark:text-neutral-300">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/timeline/aceternity-1.png"
              alt="Aceternity UI Screenshot 1"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/timeline/aceternity-2.png"
              alt="Aceternity UI Screenshot 2"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/timeline/aceternity-3.png"
              alt="Aceternity UI Screenshot 3"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/timeline/aceternity-4.png"
              alt="Aceternity UI Screenshot 4"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div className="space-y-6">
          <p className="text-neutral-700 dark:text-neutral-300">
            I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/timeline/early-2023-1.png"
              alt="Early 2023 Project 1"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/timeline/early-2023-2.png"
              alt="Early 2023 Project 2"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/timeline/early-2023-3.png"
              alt="Early 2023 Project 3"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
            <Image
              src="/timeline/early-2023-4.png"
              alt="Early 2023 Project 4"
              width={400}
              height={300}
              className="rounded-lg border border-neutral-200 dark:border-neutral-800"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Changelog",
      content: (
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            Deployed 5 new components on Aceternity today
          </p>
          <ul className="list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>✅ Card grid component</li>
            <li>✅ Startup template Aceternity</li>
            <li>✅ Random file upload lol</li>
            <li>✅ Himesh Reshammiya Music CD</li>
            <li>✅ Salman Bhai Fan Club opens</li>
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
