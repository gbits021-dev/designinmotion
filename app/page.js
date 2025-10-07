"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      })
    );
  }, []);

  return (
    <main className="font-sans text-gray-800">
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="font-bold text-lg text-blue-700">Design in Motion</h1>
          <nav className="space-x-5 text-sm">
            <a href="#about" className="hover:text-blue-700">About</a>
            <a href="#partners" className="hover:text-blue-700">Partners</a>
            <a href="#venue" className="hover:text-blue-700">Venue</a>
            <a href="#agenda" className="hover:text-blue-700">Agenda</a>
            <a href="#registration" className="hover:text-blue-700">Registration</a>
          </nav>
        </div>
      </header>

      <section className="pt-24 bg-gradient-to-b from-blue-700 to-blue-900 text-white text-center py-32">
        <h2 className="text-4xl font-bold mb-4">DIO Architects Event 2025</h2>
        <p className="text-lg">Design in Motion — Innovation in Architecture and Building Systems</p>
      </section>

      <section id="about" className="max-w-6xl mx-auto py-20 grid md:grid-cols-2 gap-8 px-4">
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-4">About the Event</h3>
          <p>
            Design in Motion brings together leading architects, designers and
            developers to explore the latest trends in building technology,
            sustainability and design innovation.
          </p>
          <p className="mt-4">
            Organized by <strong>DIO</strong> in partnership with Aluplast and Aluprof,
            this one-day event offers inspiration, networking and collaboration.
          </p>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
            width={600}
            height={400}
            alt="Architecture"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section id="partners" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-semibold text-blue-700 mb-10">Partners</h3>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "DIO",
                logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg",
                text: "Georgian leader in window, door and shading systems.",
                link: "https://dio.ge",
              },
              {
                name: "Aluplast",
                logo: "https://www.aluplast.net/fileadmin/user_upload/aluplast_logo.svg",
                text: "German manufacturer of advanced uPVC window systems.",
                link: "https://aluplast.net",
              },
              {
                name: "Aluprof",
                logo: "https://www.aluprof.eu/themes/aluprof/logo.svg",
                text: "European aluminum system innovator and long-term DIO partner.",
                link: "https://aluprof.eu",
              },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-lg shadow p-6">
                <img src={p.logo} alt={p.name} className="h-12 mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">{p.name}</h4>
                <p className="text-sm mb-3">{p.text}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 text-sm font-medium hover:underline"
                >
                  Visit Site →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" className="max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">Venue & Date</h3>
        <p className="mb-2">📅 20 November 2025, 11:00 – 16:00</p>
        <p className="mb-4">🏛️ Hotel Stamba, Tbilisi</p>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.579591451229!2d44.78325907596716!3d41.70766517378264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cde2061b5b3%3A0x2b5cb1bfc4ee8eb1!2sStamba%20Hotel%20Tbilisi!5e0!3m2!1sen!2sge!4v1696000000000!5m2!1sen!2sge"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg border-0 shadow"
        ></iframe>
      </section>

      <section id="agenda" className="bg-gray-50 py-20 text-center">
        <h3 className="text-3xl font-semibold text-blue-700 mb-6">Agenda</h3>
        <img
          src="https://images.unsplash.com/photo-1551836022-4c4c79ecde18"
          alt="Agenda"
          className="mx-auto rounded-lg shadow-lg max-w-3xl"
        />
      </section>

      <section id="registration" className="max-w-6xl mx-auto py-20 text-center px-4">
        <h3 className="text-3xl font-semibold text-blue-700 mb-4">Registration</h3>
        <p className="mb-6">Participation is free — please confirm your attendance.</p>
        <a
          href="https://docs.google.com/forms/d/your_form_id_here"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Fill the Google Form
        </a>
      </section>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="space-x-4 text-sm mb-3 md:mb-0">
            <a href="#about" className="hover:underline">About</a>
            <a href="#partners" className="hover:underline">Partners</a>
            <a href="#venue" className="hover:underline">Venue</a>
            <a href="#agenda" className="hover:underline">Agenda</a>
            <a href="#registration" className="hover:underline">Registration</a>
          </div>
          <p className="text-xs">© 2025 DIO. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
