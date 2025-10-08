"use client";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = {
    en: {
      menu: ["About", "Partners", "Venue", "Agenda", "Registration"],
      title: "Design in Motion",
      subtitle: "DIO Architects Event 2025 – Innovation in Architecture and Building Systems",
      about: "About the Event",
      aboutText:
        "Design in Motion brings together architects, designers, and developers to explore innovation in architecture, sustainability, and design.",
      partners: "Partners",
      venue: "Venue & Date",
      agenda: "Agenda",
      registration: "Registration",
      date: "20 November 2025, 11:00 – 16:00",
      place: "Hotel Stamba, Tbilisi",
      register: "Fill the Google Form",
      free: "Participation is free — please confirm your attendance.",
      rights: "© 2025 DIO. All rights reserved.",
    },
    ka: {
      menu: ["შესახებ", "პარტნიორები", "ადგილი", "დღის პროგრამა", "რეგისტრაცია"],
      title: "Design in Motion",
      subtitle: "DIO არქიტექტორთა ღონისძიება 2025 – ინოვაცია არქიტექტურასა და მშენებლობაში",
      about: "ღონისძიების შესახებ",
      aboutText:
        "Design in Motion აერთიანებს არქიტექტორებს, დიზაინერებსა და დეველოპერებს, რათა ერთად განიხილონ ინოვაციები არქიტექტურაში, მდგრადობაში და დიზაინში.",
      partners: "პარტნიორები",
      venue: "ადგილი და თარიღი",
      agenda: "დღის პროგრამა",
      registration: "რეგისტრაცია",
      date: "20 ნოემბერი 2025, 11:00 – 16:00",
      place: "სასტუმრო სტამბა, თბილისი",
      register: "შეავსეთ ფორმა",
      free: "მონაწილეობა უფასოა — გთხოვთ დაადასტუროთ თქვენი დასწრება.",
      rights: "© 2025 DIO. ყველა უფლება დაცულია.",
    },
  };

  return (
    <main id="top" className="text-gray-800">
      {/* HERO SECTION */}
      <section
        className="relative h-[60vh] bg-cover bg-center text-white flex flex-col justify-between"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Top Row: Title & Language */}
        <div className="flex justify-between items-center px-8 pt-6">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              {t[lang].title}
            </h1>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DIO_logo_placeholder.svg/2560px-DIO_logo_placeholder.svg.png"
              alt="DIO Logo"
              className="h-8 ml-2"
            />
          </div>
          <div>
            <button
              onClick={() => setLang("ka")}
              className={`mr-2 ${lang === "ka" ? "font-semibold text-blue-300" : ""}`}
            >
              🇬🇪
            </button>
            <button
              onClick={() => setLang("en")}
              className={`${lang === "en" ? "font-semibold text-blue-300" : ""}`}
            >
              🇬🇧
            </button>
          </div>
        </div>

        {/* Centered Text */}
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            {t[lang].title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto drop-shadow-md">
            {t[lang].subtitle}
          </p>
        </div>

        {/* Bottom Menu */}
        <nav className="bg-black/50 backdrop-blur-sm w-full py-5 flex justify-center space-x-8 text-base md:text-lg font-semibold">
          <a href="#about" className="hover:text-blue-300 transition">
            {t[lang].menu[0]}
          </a>
          <a href="#partners" className="hover:text-blue-300 transition">
            {t[lang].menu[1]}
          </a>
          <a href="#venue" className="hover:text-blue-300 transition">
            {t[lang].menu[2]}
          </a>
          <a href="#agenda" className="hover:text-blue-300 transition">
            {t[lang].menu[3]}
          </a>
          <a href="#registration" className="hover:text-blue-300 transition">
            {t[lang].menu[4]}
          </a>
        </nav>
      </section>

      {/* --- Rest of your sections (About, Partners, etc.) stay unchanged --- */}
    </main>
  );
}
