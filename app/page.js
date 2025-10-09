"use client";
import { useState, useEffect } from "react";
import translations from "./translations";
import Image from "next/image";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const t = translations;

  // Countdown Timer Logic
  useEffect(() => {
    const eventDate = new Date("2025-11-20T11:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main id="top" className="text-gray-800">
      {/* HERO + COUNTDOWN CONTAINER - 100vh total */}
      <div className="h-screen flex flex-col">
        {/* HERO SECTION - 80% */}
        <section className="relative h-[80%] flex flex-col justify-between text-white overflow-hidden">
          {/* Banner Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/banner.jpg"
              alt="Design in Motion Banner"
              fill
              priority
              quality={90}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Top Row: Title + Flags */}
          <div className="flex justify-between items-start px-4 pt-4 sm:px-8 sm:pt-6">
            {/* Title + Logo */}
            <div className="bg-[#21263A]/90 px-5 py-3 rounded-md shadow-md flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white">
                {t[lang].title}
              </h1>
              <img
                src={lang === "ka" ? "/dio-logo-ka.svg" : "/dio-logo-en.svg"}
                alt="DIO Logo"
                className="h-10 sm:h-12 md:h-14 object-contain"
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

          {/* Subtitle Bar (Bottom of Hero) */}
          <div className="absolute bottom-14 w-full text-center px-4">
            <p className="inline-block bg-[#21263A]/95 text-white text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-6 py-2 rounded-md shadow-lg backdrop-blur-sm">
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

            {/* Mobile Hamburger */}
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

            {/* Mobile Dropdown */}
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

        {/* COUNTDOWN TIMER SECTION - 20% - DIGITAL CLOCK STYLE */}
        <section className="bg-[#21263A] h-[20%] flex items-center justify-center px-4">
          <div className="w-full max-w-5xl text-center">
            <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4">
              {lang === "en" ? "Event Starts In" : "ღონისძიება იწყება"}
            </h2>
            
            {/* Digital Clock Style Countdown */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              {/* Days */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Days" : "დღე"}
                </div>
              </div>

              {/* Separator : */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-5">:</div>

              {/* Hours */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Hours" : "საათი"}
                </div>
              </div>

              {/* Separator : */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-5">:</div>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Minutes" : "წუთი"}
                </div>
              </div>

              {/* Separator : */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-5">:</div>

              {/* Seconds */}
              <div className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Seconds" : "წამი"}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="text-center">
              <p className="text-blue-100 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium">
                📅 {t[lang].date} | 🏛️ {t[lang].place}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ABOUT */}
      <section
        id="about"
        className="max-w-6xl mx-auto py-16 sm:py-20 grid md:grid-cols-2 gap-8 px-4"
      >
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
            {lang === "en" ? "Design in Motion" : "დიზაინი მოძრაობაში"}
          </h3>
          <h4 className="text-xl font-semibold text-gray-700 mb-3">
            {lang === "en" ? "Architectural Innovation in Action" : "არქიტექტურული ინოვაცია მოქმედებაში"}
          </h4>
          <p className="mb-4">
            {lang === "en" 
              ? "Join us for an inspiring half-day event where architecture meets technology, aesthetics meets performance, and ideas move into action."
              : "შემოგვიერთდით ინსპირირებულ ნახევარდღიან ღონისძიებას, სადაც არქიტექტურა ხვდება ტექნოლოგიას, ესთეტიკა - შესრულებას და იდეები გადადიან მოქმედებაში."}
          </p>
          <p className="text-gray-600">
            {lang === "en" 
              ? "Open to architects, designers, engineers & industry professionals."
              : "ღია არქიტექტორებისთვის, დიზაინერებისთვის, ინჟინრებისთვის და ინდუსტრიის პროფესიონალებისთვის."}
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"
            alt="Architecture Event"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>
      </section>

      {/* DIO'S ARCHITECTS CLUB */}
      <section id="architects-club" className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-10 text-center">
            {lang === "en" ? "DIO's Architects Club" : "„დიო"-ს არქიტექტორთა კლუბი"}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Gallery - Left Side */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                {lang === "en" ? "Past Events Gallery" : "წარსული ღონისძიებები"}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/club-event-1.jpg"
                  alt="Architects Club Event 1"
                  className="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="/club-event-2.jpg"
                  alt="Architects Club Event 2"
                  className="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="/club-event-3.jpg"
                  alt="Architects Club Event 3"
                  className="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="/club-event-4.jpg"
                  alt="Architects Club Event 4"
                  className="rounded-lg shadow-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* History - Right Side */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                {lang === "en" ? "Our Story" : "ჩვენი ისტორია"}
              </h4>
              <div className="space-y-4 text-gray-700">
                {lang === "en" ? (
                  <>
                    <p>
                      The DIO Architects Club was founded on April 14, 2016, with a vision to unite leading architects, designers, and industry professionals around innovation in architecture and building systems.
                    </p>
                    <p>
                      Our mission is to foster collaboration between DIO and the architectural community, providing members with exclusive insights into cutting-edge products while gathering valuable feedback to shape the future of design.
                    </p>
                    <p className="font-semibold">Active club members enjoy:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Special benefits on DIO products for their projects</li>
                      <li>Exclusive visits to partner facilities across Europe</li>
                      <li>Access to masterclasses with world-renowned architects</li>
                      <li>Networking opportunities with industry leaders</li>
                      <li>Early access to new product launches and innovations</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>
                      „დიო"-ს არქიტექტორთა კლუბი ჩამოყალიბდა 2016 წლის 14 აპრილს.
                    </p>
                    <p>
                      კლუბის მიზანია კომპანია „დიო"-ს ირგვლივ გავაერთიანოთ ყველა წამყვანი და აქტიური არქიტექტორი და დიზაინერი, რათა შევძლოთ ორმხრივი თანამშრომლობის ფარგლებში პირველებს მივაწოდოთ საჭირო ინფორმაცია ჩვენი ექსკლუზიური პროდუქტების შესახებ, მოვისმინოთ მათგან რჩევები და ერთად ვიმუშავოთ საინტერესო პროექტებზე.
                    </p>
                    <p className="font-semibold">აქტიური კლუბის წევრებს ექნებათ შესაძლებლობა:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>მიიღონ დამატებითი ბენეფიტები სხვადასხვა პროექტებში „დიოს" პროდუქტების გამოყენებით</li>
                      <li>„დიო"-ს პარტნიორ კომპანიებს ესტუმრონ ევროპის სხვადასხვა ქვეყნებში</li>
                      <li>დაესწრონ სპეციალურად მოწვეული მსოფლიო დონის არქიტექტორების მიერ ჩატარებულ შეხვედრებს</li>
                      <li>დაუკავშირდნენ ინდუსტრიის ლიდერებს</li>
                      <li>პირველებმა გაეცნონ ახალ პროდუქტებსა და ინოვაციებს</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
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
      <section
        id="venue"
        className="max-w-6xl mx-auto py-16 sm:py-20 px-4 text-center"
      >
        <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-4">
          {t[lang].venue}
        </h3>
        <p className="mb-2">📅 {t[lang].date}</p>
        <p className="mb-4">🏛️ {t[lang].placeDetailed}</p>
        <iframe
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.4926763019713!2d44.80099097649392!3d41.69453997126108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7de7e0a07%3A0x48e82e1c1a0b5935!2sTbilisi%20Marriott%20Hotel!5e0!3m2!1sen!2sge!4v1696000000000!5m2!1sen!2sge"
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
      <section
        id="registration"
        className="bg-gray-50 py-16 sm:py-20 text-center"
      >
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
