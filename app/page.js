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

      {/* ABOUT */}
      <section
        id="about"
        className="max-w-6xl mx-auto py-20 grid md:grid-cols-2 gap-8 px-4"
      >
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-4">
            {t[lang].about}
          </h3>
          <p>{t[lang].aboutText}</p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
            alt="Architecture"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      {/* PARTNERS */}
      <section id="partners" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold text-blue-700 mb-10">
            {t[lang].partners}
          </h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "DIO", link: "https://dio.ge" },
              { name: "Aluplast", link: "https://aluplast.net" },
              { name: "Aluprof", link: "https://aluprof.eu" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <h4 className="font-semibold text-lg mb-2">{p.name}</h4>
                <p className="text-sm text-gray-600">Visit site →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section id="venue" className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">
          {t[lang].venue}
        </h3>
        <p className="mb-2">📅 {t[lang].date}</p>
        <p className="mb-4">🏛️ {t[lang].place}</p>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.579591451229!2d44.78325907596716!3d41.70766517378264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cde2061b5b3%3A0x2b5cb1bfc4ee8eb1!2sStamba%20Hotel%20Tbilisi!5e0!3m2!1sen!2sge!4v1696000000000!5m2!1sen!2sge"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg border-0 shadow"
        ></iframe>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="py-20 bg-white text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-6">
          {t[lang].agenda}
        </h3>
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6c741e85"
          alt="Agenda"
          className="max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* REGISTRATION */}
      <section id="registration" className="bg-gray-50 py-20 text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">
          {t[lang].registration}
        </h3>
        <p className="mb-6">{t[lang].free}</p>
        <a
          href="https://docs.google.com/forms/d/your_form_id_here"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          {t[lang].register}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-8 text-center">
        <p className="text-sm">{t[lang].rights}</p>
      </footer>
    </main>
  );
}
