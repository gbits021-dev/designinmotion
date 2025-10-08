"use client";
import { useState } from "react";
import translations from "./translations";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations;

  return (
    <main id="top" className="text-gray-800">
      {/* HERO SECTION */}
      <section
        className="relative h-[60vh] sm:h-[50vh] bg-cover bg-center text-white flex flex-col justify-between"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Top Row: Title + Flags */}
        <div className="flex justify-between items-center px-4 pt-4 sm:px-8 sm:pt-6">
          {/* Title + Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
              {t[lang].title}
            </h1>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DIO_logo_placeholder.svg/2560px-DIO_logo_placeholder.svg.png"
              alt="DIO Logo"
              className="h-6 sm:h-8"
            />
          </div>

          {/* Flags */}
          <div className="flex items-center space-x-3 mt-2 sm:mt-0">
            <button
              onClick={() => setLang("ka")}
              className={`transition transform hover:scale-105 ${
                lang === "ka" ? "opacity-100" : "opacity-60"
              }`}
            >
              <img
                src="https://flagcdn.com/w20/ge.png"
                alt="Georgian"
                className="w-6 h-4 sm:w-8 sm:h-5 rounded-sm border border-white/40"
              />
            </button>

            <button
              onClick={() => setLang("en")}
              className={`transition transform hover:scale-105 ${
                lang === "en" ? "opacity-100" : "opacity-60"
              }`}
            >
              <img
                src="https://flagcdn.com/w20/gb.png"
                alt="English"
                className="w-6 h-4 sm:w-8 sm:h-5 rounded-sm border border-white/40"
              />
            </button>
          </div>
        </div>

        {/* Centered Text */}
        <div className="text-center px-4 mt-6 sm:mt-0 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            {t[lang].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto drop-shadow-md">
            {t[lang].subtitle}
          </p>
        </div>

        {/* --- BOTTOM NAVIGATION AREA --- */}
        <div className="relative">
          {/* Desktop Menu */}
          <nav className="hidden sm:flex bg-black/50 backdrop-blur-sm w-full py-4 justify-center space-x-6 md:space-x-8 text-base font-semibold">
            {t[lang].menu.map((m, i) => (
              <a
                key={i}
                href={`#${[
                  "about",
                  "partners",
                  "venue",
                  "agenda",
                  "registration",
                ][i]}`}
                className="hover:text-blue-300 transition"
              >
                {m}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="sm:hidden flex justify-center bg-black/60 backdrop-blur-sm py-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center space-y-1 w-8 h-8"
            >
              <span
                className={`block h-0.5 bg-white transform transition duration-300 ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transition duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transform transition duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <nav className="sm:hidden absolute bottom-[60px] left-0 w-full bg-black/85 backdrop-blur-lg flex flex-col items-center py-4 space-y-3 text-lg font-medium z-10">
              {t[lang].menu.map((m, i) => (
                <a
                  key={i}
                  href={`#${[
                    "about",
                    "partners",
                    "venue",
                    "agenda",
                    "registration",
                  ][i]}`}
                  className="hover:text-blue-300 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {m}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="max-w-6xl mx-auto py-16 sm:py-20 grid md:grid-cols-2 gap-8 px-4"
      >
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
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
      <section id="partners" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-10">
            {t[lang].partners}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
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
      <section id="venue" className="max-w-6xl mx-auto py-16 sm:py-20 px-4 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
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
      <section id="agenda" className="py-16 sm:py-20 bg-white text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-6">
          {t[lang].agenda}
        </h3>
        <img
          src="https://images.unsplash.com/photo-1581091215367-59ab6c741e85"
          alt="Agenda"
          className="max-w-4xl mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* REGISTRATION */}
      <section id="registration" className="bg-gray-50 py-16 sm:py-20 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
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
