"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Layout() {
  return (
    <main className="flex h-screen">
      <section className="text-white flex flex-col bg-primary w-[35%] min-w-lg pt-12 pb-16 px-10">
        <div className="bg-white w-fit p-1 rounded-full mb-24">
          <Image
            src="/logo.png"
            alt=""
            width={64}
            height={64}
            className="mx-auto h-16 w-16"
          />
        </div>

        <div className="grow flex flex-col justify-between">
          <div>
            <h1 className="font-alb text-5xl text-white leading-14 font-bold mb-4 flex flex-col">
              <span>Ready to Join Us?</span>
              <span>Begin Your Admission Process</span>
            </h1>

            <p className="font-alb font-light text-2xl text-[#F2F4F7]">
              Welcome to the official application portal. Create your secure
              account to save your progress, submit your application, and track
              your admission status.
            </p>
          </div>

          <QuoteSlider />
        </div>
      </section>

      <section>
        <h2>Create your account.</h2>
      </section>
    </main>
  );
}

function QuoteSlider() {
  const quotes = [
    {
      text: "The future belongs to those who prepare for it today.",
      author: "Malcolm X",
    },
    {
      text: "Learning is a passport to opportunity; applying is the first step to the journey.",
      author: "Anonymous",
    },
    {
      text: "The journey of a thousand steps begins with a single action.",
      author: "Lao Tzu",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="relative w-full font-manrope max-w-xl mx-auto bg-black/20 rounded-2xl backdrop-blur-lg h-40 flex items-center">
      {quotes.map((quote, i) => (
        <div
          key={i}
          className={`absolute text-white/85 transition-opacity duration-700 px-6 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <q className="text-2xl">{quote.text}</q>
          <p className="text-white mt-2 font-lex">{quote.author}</p>
        </div>
      ))}
    </div>
  );
}
