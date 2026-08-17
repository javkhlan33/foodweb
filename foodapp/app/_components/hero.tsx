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
    <section className="relative h-[570px] w-full overflow-hidden bg-[#F5F1EA]">
      {/* Background */}
      <div className="absolute -left-40 -top-30 rotate-[-10deg] leading-[82px]">
        {Array.from({ length: 9 }).map((_, i) => (
          <h1
            key={i}
            className={`${anton.className}
            text-[88px]
            tracking-[-2px]
            whitespace-nowrap
            ${i % 2 === 0 ? "text-[#FD543F]/30" : "text-[#D6D6D6]/30"}`}
          >
            SAY CHEESE • FRESH FAST DELIVERED! SAY CHEESE • FRESH FAST
            DELIVERED!
          </h1>
        ))}
      </div>

      {/* Black Banner */}
      <div className="absolute left-0 top-[130px] h-[320px] w-[1320px] rounded-r-[170px] bg-[#171717] border-b-[12px] border-[#FD543F]" />

      {/* TODAY'S */}
      <div className="absolute left-[52px] top-[152px] z-20 w-[459px] h-[190px]">
        <h1
          className={`${bebas.className} text-[159px] leading-none text-white`}
        >
          TODAY'S
        </h1>
      </div>

      {/* OFFER! */}
      <div className="absolute right-[200px] top-[260px] z-50">
        <h1
          className={`${bebas.className} text-[159px] leading-none text-white`}
        >
          OFFER!
        </h1>
      </div>

      {/* Button */}
      <div className="absolute left-[110px] top-[315px] z-40">
        {/* White shadow */}
        <div className="absolute left-2 top-2 h-16 w-[310px] rounded-full bg-white"></div>

        {/* Orange button */}
        <div className="relative flex h-16 w-[310px] items-center justify-center rounded-full bg-[#FD543F]">
          <p className={`${bebas.className} text-[60px] font-bold text-white`}>
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
        className="absolute left-[200px]  z-30"
      />

      {/* Plus */}
      <div className="absolute right-[500px] top-[170px] z-40">
        <Image src="/Plus icon.png" alt="plus" width={70} height={70} />
      </div>
      {/* Cake */}
      <Image
        src="/byluu.png"
        alt="Cake"
        width={150}
        height={150}
        className="absolute right-[300px] top-[60px] z-40"
      />
      {/* Plate */}
      <Image
        src="/tavag.png"
        alt="Plate"
        width={330}
        height={330}
        className="absolute right-[200px] top-[100px] z-30"
      />
    </section>
  );
}
