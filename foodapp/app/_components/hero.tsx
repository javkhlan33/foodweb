"use client";

import Image from "next/image";
import { Anton } from "next/font/google";
import { Bebas_Neue } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <section className="relative h-[320px] w-full overflow-hidden bg-[#F5F1EA] sm:h-[420px] lg:h-[570px]">
      {/* Background text */}
      <div className="absolute -left-20 -top-16 rotate-[-10deg] leading-[42px] sm:-left-32 sm:-top-24 sm:leading-[62px] lg:-left-40 lg:-top-30 lg:leading-[82px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <h1
            key={i}
            className={`${anton.className}
            text-[40px]
            tracking-[-1px]
            whitespace-nowrap
            sm:text-[64px]
            lg:text-[88px]
            lg:tracking-[-2px]
            ${i % 2 === 0 ? "text-[#FD543F]/30" : "text-[#D6D6D6]/30"}`}
          >
            SAY CHEESE • FRESH FAST DELIVERED! SAY CHEESE • FRESH FAST
            DELIVERED!
          </h1>
        ))}
      </div>

      {/* Black Banner */}
      <div className="absolute left-0 top-[70px] h-[180px] w-[92%] max-w-[1320px] rounded-r-[80px] border-b-[8px] border-[#FD543F] bg-[#171717] sm:top-[100px] sm:h-[240px] sm:rounded-r-[120px] sm:border-b-[10px] lg:top-[130px] lg:h-[320px] lg:rounded-r-[170px] lg:border-b-[12px]" />

      {/* TODAY'S */}
      <div className="absolute left-4 top-[82px] z-20 sm:left-8 sm:top-[120px] lg:left-[52px] lg:top-[152px]">
        <h1
          className={`${bebas.className} text-[56px] leading-none text-white sm:text-[100px] lg:text-[159px]`}
        >
          TODAY&apos;S
        </h1>
      </div>

      {/* OFFER! */}
      <div className="absolute right-4 top-[150px] z-50 sm:right-16 sm:top-[200px] lg:right-[200px] lg:top-[260px]">
        <h1
          className={`${bebas.className} text-[56px] leading-none text-white sm:text-[100px] lg:text-[159px]`}
        >
          OFFER!
        </h1>
      </div>

      {/* Button */}
      <div className="absolute left-4 top-[180px] z-40 sm:left-10 sm:top-[250px] lg:left-[110px] lg:top-[315px]">
        <div className="absolute left-1 top-1 h-10 w-[180px] rounded-full bg-white sm:left-2 sm:top-2 sm:h-12 sm:w-[240px] lg:h-16 lg:w-[310px]" />

        <div className="relative flex h-10 w-[180px] items-center justify-center rounded-full bg-[#FD543F] sm:h-12 sm:w-[240px] lg:h-16 lg:w-[310px]">
          <p
            className={`${bebas.className} text-[28px] font-bold text-white sm:text-[40px] lg:text-[60px]`}
          >
            STEAK SOCIETY
          </p>
        </div>
      </div>

      {/* Main Food */}
      <Image
        src="/herohool1.png"
        alt="Main Food"
        width={950}
        height={950}
        className="absolute left-[20%] top-8 z-30 w-[55%] max-w-[420px] sm:left-[28%] sm:top-4 sm:w-[50%] lg:left-[200px] lg:top-0 lg:w-auto lg:max-w-none"
      />

      {/* Plus - hide on small phones */}
      <div className="absolute right-[28%] top-[90px] z-40 hidden sm:block lg:right-[500px] lg:top-[170px]">
        <Image
          src="/Plus icon.png"
          alt="plus"
          width={70}
          height={70}
          className="h-10 w-10 lg:h-[70px] lg:w-[70px]"
        />
      </div>

      {/* Cake */}
      <Image
        src="/byluu.png"
        alt="Cake"
        width={150}
        height={150}
        className="absolute right-[18%] top-4 z-40 hidden w-16 sm:block lg:right-[300px] lg:top-[60px] lg:w-[150px]"
      />

      {/* Plate */}
      <Image
        src="/tavag.png"
        alt="Plate"
        width={330}
        height={330}
        className="absolute right-[8%] top-[50px] z-30 w-28 sm:w-40 lg:right-[200px] lg:top-[100px] lg:w-[330px]"
      />
    </section>
  );
}
