"use client";
import { useState, useEffect } from "react";
import translations from "./translations";
import Image from "next/image";

export default function Home() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const t = translations;

  const clubImages = [
    "/club-event-1.jpg",
    "/club-event-2.jpg",
    "/club-event-3.jpg",
    "/club-event-4.jpg",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % clubImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + clubImages.length) % clubImages.length);
  };

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
            {/* Desktop Menu - FIXED */}
            <nav className="hidden sm:flex bg-black/50 backdrop-blur-sm w-full py-4 justify-center space-x-6 md:space-x-8 text-base font-semibold sticky top-0 z-50">
              {t[lang].menu.map((m, i) => (
                <a
                  key={i}
                  href={`#${[
                    "about",
                    "architects-club",
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

      {/* ABOUT - Inspired by SHARE Georgia Design */}
      <section
        id="about"
        className="max-w-7xl mx-auto py-20 sm:py-28 px-4"
      >
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Left - Portrait Poster */}
          <div className="md:col-span-2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=900"
                alt="Design in Motion Poster"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                {lang === "en" 
                  ? "Connecting Architecture, Engineering, and Design Leaders" 
                  : "არქიტექტურის, ინჟინერიის და დიზაინის ლიდერების დაკავშირება"}
              </h2>
            </div>

            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                {lang === "en"
                  ? "We are excited to announce Design in Motion 2025, an inspiring half-day event where architecture meets technology, aesthetics meets performance, and ideas move into action."
                  : "ჩვენ გვიხარია გაცნობოთ Design in Motion 2025, ინსპირირებული ნახევარდღიანი ღონისძიება, სადაც არქიტექტურა ხვდება ტექნოლოგიას, ესთეტიკა - შესრულებას და იდეები გადადიან მოქმედებაში."}
              </p>
              
              <p>
                {lang === "en"
                  ? "Following the success of previous editions, this year's forum continues to connect architecture, engineering, and construction professionals through an inspiring program of keynotes, case studies, and networking opportunities."
                  : "წინა წლების წარმატების შემდეგ, წელს ფორუმი აგრძელებს არქიტექტურის, ინჟინერიის და მშენებლობის პროფესიონალების დაკავშირებას საინტერესო პროგრამით, რომელიც მოიცავს კონფერენციებს, შემთხვევის შესწავლებს და ქსელის შექმნის შესაძლებლობებს."}
              </p>

              <p className="font-semibold text-xl text-blue-700">
                {lang === "en"
                  ? "Join us at Marriott Hotel Tbilisi and experience a day of inspiration, professional connection, and forward-thinking design."
                  : "შემოგვიერთდით მარიოტ ჰოტელში თბილისში და განიცადეთ ინსპირაციის, პროფესიული კავშირისა და პროგრესული დიზაინის დღე."}
              </p>

              <div className="pt-4">
                <p className="text-gray-600">
                  {lang === "en"
                    ? "Open to architects, designers, engineers & industry professionals."
                    : "ღია არქიტექტორებისთვის, დიზაინერებისთვის, ინჟინრებისთვის და ინდუსტრიის პროფესიონალებისთვის."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIO'S ARCHITECTS CLUB - Inspired by Yellow Ticket Section */}
      <section id="architects-club" className="relative min-h-screen flex items-center py-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920"
            alt="Architecture Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/95 via-yellow-400/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Image Slider */}
            <div>
              <div className="relative">
                {/* Main Image */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={clubImages[currentSlide]}
                    alt={`Past Event ${currentSlide + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Previous Button */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Slide Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentSlide + 1} / {clubImages.length}
                  </div>
                </div>
                
                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-6">
                  {clubImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-gray-900 w-12' 
                          : 'bg-gray-400 w-3 hover:bg-gray-600'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Title Below Slider */}
                <h4 className="text-center mt-6 text-2xl font-bold text-gray-900">
                  {lang === "en" ? "Past Events" : "წარსული ღონისძიებები"}
                </h4>
              </div>
            </div>

            {/* Right - Content with Transparent Background */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  {lang === "en" ? "DIO's Architects Club" : "დიოს არქიტექტორთა კლუბი"}
                </h2>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {lang === "en" ? "Join Our Community" : "შემოგვიერთდით"}
                </h3>
              </div>

              <div className="space-y-4 text-gray-900 text-lg leading-relaxed">
                {lang === "en" ? (
                  <>
                    <p className="font-semibold">
                      The DIO Architects Club was founded on April 14, 2016, with a vision to unite leading architects, designers, and industry professionals.
                    </p>
                    
                    <p>
                      Our mission is to foster collaboration between DIO and the architectural community, providing members with exclusive insights into cutting-edge products and innovations.
                    </p>

                    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 mt-6">
                      <p className="font-bold text-xl mb-4 text-gray-900">Active Members Enjoy:</p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>Special benefits on DIO products</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>Exclusive visits to European partner facilities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>Masterclasses with world-renowned architects</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>Networking with industry leaders</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>Early access to new innovations</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">
                      დიოს არქიტექტორთა კლუბი ჩამოყალიბდა 2016 წლის 14 აპრილს, წამყვანი არქიტექტორებისა და დიზაინერების გაერთიანების მიზნით.
                    </p>
                    
                    <p>
                      ჩვენი მისიაა ხელი შევუწყოთ თანამშრომლობას დიოსა და არქიტექტურულ საზოგადოებას შორის, მივაწოდოთ წევრებს ექსკლუზიური ინფორმაცია ინოვაციებისა და პროდუქტების შესახებ.
                    </p>

                    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 mt-6">
                      <p className="font-bold text-xl mb-4 text-gray-900">აქტიური წევრების შესაძლებლობები:</p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>დამატებითი ბენეფიტები დიოს პროდუქტებზე</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>ვიზიტები ევროპის პარტნიორ კომპანიებში</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>მასტერკლასები მსოფლიო არქიტექტორებთან</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>ქსელის შექმნა ინდუსტრიის ლიდერებთან</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-yellow-700 font-bold mr-2">✓</span>
                          <span>ადრეული წვდომა ახალ ინოვაციებზე</span>
                        </li>
                      </ul>
                    </div>
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
