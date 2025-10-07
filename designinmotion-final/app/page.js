"use client";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = {
    en: {
      title: "Design in Motion",
      subtitle: "DIO Architects Event 2025 – Innovation in Architecture and Building Systems",
      about: "About the Event",
      aboutText: "Design in Motion brings together architects, designers, and developers to explore innovation in architecture, sustainability, and design.",
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
      aboutText: "Design in Motion აერთიანებს არქიტექტორებს, დიზაინერებსა და დეველოპერებს, რათა ერთად განიხილონ ინოვაციები არქიტექტურაში, მდგრადობაში და დიზაინში.",
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
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", background: "#fff", borderBottom: "1px solid #ccc", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1000 }}>
        <h1 style={{ color: "#0055a5", fontWeight: "bold" }}>Design in Motion</h1>
        <div>
          <button onClick={() => setLang("ka")} style={{ marginRight: "5px" }}>🇬🇪</button>
          <button onClick={() => setLang("en")}>🇬🇧</button>
        </div>
      </header>

      <section style={{ paddingTop: "80px", textAlign: "center", background: "linear-gradient(180deg, #0055a5, #003c7a)", color: "#fff", padding: "100px 20px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "10px" }}>{t[lang].title}</h2>
        <p style={{ fontSize: "18px" }}>{t[lang].subtitle}</p>
      </section>

      <section id="about" style={{ maxWidth: "900px", margin: "60px auto", padding: "0 20px" }}>
        <h3 style={{ color: "#0055a5", fontSize: "26px", marginBottom: "15px" }}>{t[lang].about}</h3>
        <p>{t[lang].aboutText}</p>
      </section>

      <section id="partners" style={{ background: "#f5f5f5", padding: "60px 20px" }}>
        <h3 style={{ color: "#0055a5", fontSize: "26px", textAlign: "center", marginBottom: "30px" }}>{t[lang].partners}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {[
            { name: "DIO", link: "https://dio.ge" },
            { name: "Aluplast", link: "https://aluplast.net" },
            { name: "Aluprof", link: "https://aluprof.eu" },
          ].map((p) => (
            <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" style={{ background: "#fff", borderRadius: "12px", padding: "20px 30px", boxShadow: "0 0 8px rgba(0,0,0,0.1)", textDecoration: "none", color: "#333", width: "200px", textAlign: "center" }}>
              <h4 style={{ marginBottom: "8px" }}>{p.name}</h4>
              <p style={{ fontSize: "14px" }}>Visit site →</p>
            </a>
          ))}
        </div>
      </section>

      <section id="venue" style={{ maxWidth: "900px", margin: "60px auto", padding: "0 20px" }}>
        <h3 style={{ color: "#0055a5", fontSize: "26px", marginBottom: "15px" }}>{t[lang].venue}</h3>
        <p>📅 {t[lang].date}</p>
        <p>🏛️ {t[lang].place}</p>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.579591451229!2d44.78325907596716!3d41.70766517378264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cde2061b5b3%3A0x2b5cb1bfc4ee8eb1!2sStamba%20Hotel%20Tbilisi!5e0!3m2!1sen!2sge!4v1696000000000!5m2!1sen!2sge"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "10px", marginTop: "20px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      <section id="registration" style={{ background: "#f5f5f5", textAlign: "center", padding: "60px 20px" }}>
        <h3 style={{ color: "#0055a5", fontSize: "26px", marginBottom: "15px" }}>{t[lang].registration}</h3>
        <p style={{ marginBottom: "20px" }}>{t[lang].free}</p>
        <a href="https://docs.google.com/forms/d/your_form_id_here" target="_blank" rel="noopener noreferrer" style={{ background: "#0055a5", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none" }}>{t[lang].register}</a>
      </section>

      <footer style={{ background: "#003c7a", color: "#fff", textAlign: "center", padding: "20px" }}>
        <p style={{ fontSize: "14px" }}>{t[lang].rights}</p>
      </footer>
    </main>
  );
}
