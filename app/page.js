"use client";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = {
    en: {
      title: "Design in Motion",
      subtitle: "DIO Architects Event 2025 – Innovation in Architecture and Building Systems",
      about: "About the Event",
      aboutText:
        "Design in Motion brings together architects, designers, and developers to explore innovation in architecture, sustainability, and design.",
      partners: "Partners",
      venue: "Venue & Date",
      registration: "Registration",
      date: "20 November 2025, 11:00 – 16:00",
      place: "Hotel Stamba, Tbilisi",
      register: "Fill the Google Form",
      free: "Participation is free — please confirm your attendance.",
      rights: "© 2025 DIO. All rights reserved.",
    },
    ka: {
      title: "Design in Motion",
      subtitle: "DIO არქიტექტორთა ღონისძიება 2025 – ინოვაცია არქიტექტურასა და მშენებლობაში",
      about: "ღონისძიების შესახებ",
      aboutText:
        "Design in Motion აერთიანებს არქიტექტორებს, დიზაინერებსა და დეველოპერებს, რათა ერთად განიხილონ ინოვაციები არქიტექტურაში, მდგრადობაში და დიზაინში.",
      partners: "პარტნიორები",
      venue: "ადგილი და თარიღი",
      registration: "რეგისტრაცია",
      date: "20 ნოემბერი 2025, 11:00 – 16:00",
      place: "სასტუმრო სტამბა, თბილისი",
      register: "შეავსეთ ფორმა",
      free: "მონაწილეობა უფასოა — გთხოვთ დაადასტუროთ თქვენი დასწრება.",
      rights: "© 2025 DIO. ყველა უფლება დაცულია.",
    },
  };

  return (
    <main>
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="font-bold text-lg text-blue-700">Design in Motion</h1>
          <div>
            <button onClick={() => setLang('ka')} className="mr-2">🇬🇪</button>
            <button onClick={() => setLang('en')}>🇬🇧</button>
          </div>
        </div>
      </header>

      <section className="pt-24 bg-gradient-to-b from-blue-700 to-blue-900 text-white text-center py-32">
        <h2 className="text-4xl font-bold mb-4">{t[lang].title}</h2>
        <p className="text-lg">{t[lang].subtitle}</p>
      </section>

      <section id="about" className="max-w-6xl mx-auto py-20 grid md:grid-cols-2 gap-8 px-4">
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-4">{t[lang].about}</h3>
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

      <section id="partners" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold text-blue-700 mb-10">{t[lang].partners}</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "DIO", link: "https://dio.ge" },
              { name: "Aluplast", link: "https://aluplast.net" },
              { name: "Aluprof", link: "https://aluprof.eu" },
            ].map((p) => (
              <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <h4 className="font-semibold text-lg mb-2">{p.name}</h4>
                <p className="text-sm text-gray-600">Visit site →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">{t[lang].venue}</h3>
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

      <section id="registration" className="bg-gray-50 py-20 text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">{t[lang].registration}</h3>
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

      <footer className="bg-blue-900 text-white py-8 text-center">
        <p className="text-sm">{t[lang].rights}</p>
      </footer>
    </main>
  );
}
