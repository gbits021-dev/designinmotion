"use client";
import { useState, useEffect } from "react";
import translations from "./translations";
import content from "./content";

export default function Home() {
  const [lang, setLang] = useState("ka");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [expandedPartner, setExpandedPartner] = useState(null);
  const [expandedSpeaker, setExpandedSpeaker] = useState(null);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [selectedVenueImage, setSelectedVenueImage] = useState(null);
  const [selectedClubImage, setSelectedClubImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const t = translations;

  // Helper function to get font for a section based on current language
  const getSectionFont = (sectionName) => {
    const fontConfig = content.fonts?.sectionFonts?.[sectionName]?.[lang];
    if (fontConfig && fontConfig.family) {
      return fontConfig.family;
    }
    return lang === "en" ? "Poppins" : "Noto Sans Georgian";
  };

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const clubImages = content.gallery;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % clubImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + clubImages.length) % clubImages.length);
  };

  // Countdown Timer Logic
  useEffect(() => {
    const eventDate = new Date(content.event.date).getTime();

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
    <main id="top" className="text-gray-800 bg-white">
      {/* HERO + COUNTDOWN CONTAINER - 100vh total */}
      <div className="h-screen flex flex-col">
        {/* HERO SECTION - 80% */}
        <section 
          className="relative h-[80%] flex flex-col justify-between text-white overflow-hidden hero-banner"
          style={{
            '--desktop-bg': `url(${content.hero.bannerImageDesktop})`,
            '--mobile-bg': `url(${content.hero.bannerImageMobile})`
          }}
        >
          <style jsx>{`
            .hero-banner {
              background-image: var(--mobile-bg);
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
            @media (min-width: 768px) {
              .hero-banner {
                background-image: var(--desktop-bg);
              }
            }
          `}</style>

          {/* Flags - Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center space-x-3 z-10">
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

          {/* Title Bar - At top of hero bottom section */}
          <div className="absolute bottom-16 sm:bottom-[4.5rem] w-full text-center px-4 z-10">
            <div className="inline-flex items-center space-x-3 bg-[#21263A]/95 px-6 py-3 rounded-md shadow-lg backdrop-blur-sm">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-white" style={{ fontFamily: getSectionFont('hero') }}>
                {content.hero.title[lang]}
              </h1>
              <img
                src={lang === "ka" ? content.hero.logoKa : content.hero.logoEn}
                alt="DIO Logo"
                className="h-10 sm:h-12 md:h-14 object-contain"
              />
            </div>
          </div>

          {/* NAVIGATION MENU - Below title at bottom of Hero */}
          {/* Mobile - Hamburger Button - Centered */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-[#21263A]/95 backdrop-blur-sm text-white p-3 rounded-t-lg border-t border-l border-r border-white/10"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Mobile - Dropdown Menu */}
          <div
            className={`md:hidden absolute bottom-0 left-0 right-0 bg-[#21263A]/95 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden z-40 border-t border-white/10 ${
              menuOpen ? 'max-h-96' : 'max-h-0'
            }`}
            style={{ fontFamily: getSectionFont('menu') }}
          >
            <nav className="flex flex-col py-2">
              {content.menu[lang].map((m, i) => (
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
                  onClick={() => setMenuOpen(false)}
                  className="px-6 py-4 text-white text-lg font-semibold hover:bg-white/10 transition border-b border-white/5 last:border-b-0"
                >
                  {m}
                </a>
              ))}
            </nav>
          </div>

          {/* Desktop - Horizontal Menu */}
          <nav className="hidden md:flex absolute bottom-0 w-full bg-[#21263A]/95 backdrop-blur-sm py-5 justify-center space-x-8 md:space-x-12 lg:space-x-16 text-lg md:text-xl font-semibold text-white border-t border-white/10 z-50" style={{ fontFamily: getSectionFont('menu') }}>
            {content.menu[lang].map((m, i) => (
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
        </section>

        {/* COUNTDOWN TIMER - Below hero */}
        <section className="bg-[#21263A] py-8">
          <div className="w-full max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-white text-base sm:text-lg md:text-xl font-bold mb-4">
              {lang === "en" ? "Event Starts In" : "ღონისძიება იწყება"}
            </h2>
            
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Days" : "დღე"}
                </div>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pb-5">:</div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Hours" : "საათი"}
                </div>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pb-5">:</div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Minutes" : "წუთი"}
                </div>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pb-5">:</div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-blue-200 text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1">
                  {lang === "en" ? "Seconds" : "წამი"}
                </div>
              </div>
            </div>
            <p className="text-blue-100 text-sm sm:text-base font-medium">
              📅 {t[lang].date} | 🏛️ {t[lang].place}
            </p>
          </div>
        </section>
      </div>

      {/* ABOUT - Compact Height */}
      {content.sectionVisibility?.about !== false && (
      <section
        id="about"
        className="max-w-7xl mx-auto py-16 px-4"
        style={{ fontFamily: getSectionFont('about') }}
      >
        <div className="grid md:grid-cols-5 gap-12 items-stretch">
          {/* Left - Taller Portrait Poster */}
          <div className="md:col-span-2">
            <div className="relative h-full min-h-[600px]">
              <img
                src={content.about.posterImage}
                alt="Design in Motion Poster"
                className="w-full h-full rounded-2xl shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="md:col-span-3 space-y-6 flex flex-col justify-center">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                {content.about.headline[lang]}
              </h2>
            </div>

            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              {content.about.paragraphs.map((para, index) => (
                <p
                  key={index}
                  className={para.highlight ? "font-semibold text-xl text-[#21263A]" : ""}
                >
                  {para[lang]}
                </p>
              ))}

              <div className="pt-4">
                <p className="text-gray-600">
                  {content.about.footer[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* DIO'S ARCHITECTS CLUB */}
      {content.sectionVisibility?.architectsClub !== false && (
      <section id="architects-club" className="bg-white py-16" style={{ fontFamily: getSectionFont('architectsClub') }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header with Logo */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#21263A]">
              {content.architectsClub.title[lang]}
            </h2>
            <img
              src={content.architectsClub.logo}
              alt="Architects Club Logo"
              className="h-24 sm:h-32 object-contain"
            />
          </div>

          {/* About the Event Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#21263A] mb-6">
              {content.architectsClub.sectionTitle[lang]}
            </h3>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              {content.architectsClub.paragraphs.map((para, index) => (
                <p key={index}>
                  {para[lang]}
                </p>
              ))}
            </div>
          </div>

          {/* Gallery Slideshow - 3 Photos Visible */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((offset) => {
                const index = (currentSlide + offset) % clubImages.length;
                return (
                  <div
                    key={offset}
                    onClick={() => setSelectedClubImage(index)}
                    className="relative h-64 overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                  >
                    <img
                      src={clubImages[index]}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Zoom icon overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Slideshow Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevSlide}
                className="bg-[#21263A] hover:bg-[#2d3449] text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Previous images"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {clubImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-[#21263A] w-8' 
                        : 'bg-gray-300 w-2 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="bg-[#21263A] hover:bg-[#2d3449] text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                aria-label="Next images"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* PARTNERS */}
      {content.sectionVisibility?.partners !== false && (
      <section id="partners" className="bg-gray-50 py-16 sm:py-20" style={{ fontFamily: getSectionFont('partners') }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-700 mb-10">
            {t[lang].partners}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {content.partners.map((p, index) => (
              <div key={p.name} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Partner Card */}
                <div className="p-8 flex flex-col items-center justify-center group">
                  <div className="h-24 w-full flex items-center justify-center mb-4">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 text-gray-800">{p.name}</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">{p.description[lang]}</p>

                  {/* Buttons */}
                  <div className="flex flex-col w-full gap-2">
                    <button
                      onClick={() => setExpandedPartner(expandedPartner === index ? null : index)}
                      className="w-full bg-[#21263A] hover:bg-[#2d3449] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>{expandedPartner === index ? (lang === "en" ? "Less Info" : "ნაკლები") : (lang === "en" ? "More Info" : "მეტი ინფო")}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${expandedPartner === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#21263A] hover:bg-[#2d3449] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>{lang === "en" ? "Visit Site" : "ვებსაიტი"}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Expandable Detailed Info */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expandedPartner === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-8 pb-6 pt-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed text-left">
                      {p.detailedInfo[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* SPEAKERS */}
      {content.sectionVisibility?.speakers !== false && (
      <section id="speakers" className="bg-white py-16 sm:py-20" style={{ fontFamily: getSectionFont('speakers') }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#21263A] mb-4">
              {content.speakers.title[lang]}
            </h3>
            <div className="w-24 h-1 bg-[#21263A] mx-auto rounded-full"></div>
          </div>

          {/* Mobile: Single speaker with arrows */}
          <div className="md:hidden">
            <div className="flex items-center justify-center gap-4">
              {/* Left Arrow */}
              <button
                onClick={() => setCurrentSpeaker((prev) => (prev - 1 + content.speakers.list.length) % content.speakers.list.length)}
                className="bg-[#21263A] hover:bg-[#2d3449] text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                aria-label="Previous speaker"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Current Speaker Card */}
              <div className="flex-1 max-w-sm">
                <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                  {/* Speaker Image - Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#21263A] shadow-xl">
                      <img
                        src={content.speakers.list[currentSpeaker].image}
                        alt={content.speakers.list[currentSpeaker].name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Speaker Name */}
                  <h4 className="text-2xl font-bold text-[#21263A] text-center mb-2">
                    {content.speakers.list[currentSpeaker].name[lang]}
                  </h4>

                  {/* Speaker Company */}
                  {content.speakers.list[currentSpeaker].company[lang] && (
                    <p className="text-gray-600 text-center mb-2 text-sm">
                      {content.speakers.list[currentSpeaker].company[lang]}
                    </p>
                  )}

                  {/* Speaker Topic */}
                  <p className="text-blue-600 font-semibold text-center mb-4">
                    {content.speakers.list[currentSpeaker].topic[lang]}
                  </p>

                  {/* View More Button */}
                  <button
                    onClick={() => setExpandedSpeaker(expandedSpeaker === currentSpeaker ? null : currentSpeaker)}
                    className="w-full bg-[#21263A] hover:bg-[#2d3449] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 mb-4"
                  >
                    <span>{expandedSpeaker === currentSpeaker ? (lang === "en" ? "Hide Bio" : "დამალვა") : (lang === "en" ? "View More" : "მეტის ნახვა")}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${expandedSpeaker === currentSpeaker ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expandable Bio */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedSpeaker === currentSpeaker ? 'max-h-96 overflow-y-auto' : 'max-h-0'
                    }`}
                  >
                    <div className="pt-4 border-t border-gray-300">
                      <p className="text-sm text-gray-700 leading-relaxed text-left">
                        {content.speakers.list[currentSpeaker].bio[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => setCurrentSpeaker((prev) => (prev + 1) % content.speakers.list.length)}
                className="bg-[#21263A] hover:bg-[#2d3449] text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                aria-label="Next speaker"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Speaker indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              {content.speakers.list.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSpeaker(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSpeaker
                      ? 'bg-[#21263A] w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to speaker ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: All speakers centered */}
          <div className="hidden md:block">
            <div className="flex justify-center gap-8 flex-wrap">
              {content.speakers.list.map((speaker, index) => (
                <div key={index} className="w-80">
                  <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Speaker Image - Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#21263A] shadow-xl">
                        <img
                          src={speaker.image}
                          alt={speaker.name[lang]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Speaker Name */}
                    <h4 className="text-2xl font-bold text-[#21263A] text-center mb-2">
                      {speaker.name[lang]}
                    </h4>

                    {/* Speaker Company */}
                    {speaker.company[lang] && (
                      <p className="text-gray-600 text-center mb-2 text-sm">
                        {speaker.company[lang]}
                      </p>
                    )}

                    {/* Speaker Topic */}
                    <p className="text-blue-600 font-semibold text-center mb-4">
                      {speaker.topic[lang]}
                    </p>

                    {/* View More Button */}
                    <button
                      onClick={() => setExpandedSpeaker(expandedSpeaker === index ? null : index)}
                      className="w-full bg-[#21263A] hover:bg-[#2d3449] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 mb-4"
                    >
                      <span>{expandedSpeaker === index ? (lang === "en" ? "Hide Bio" : "დამალვა") : (lang === "en" ? "View More" : "მეტის ნახვა")}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${expandedSpeaker === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expandable Bio */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedSpeaker === index ? 'max-h-96 overflow-y-auto' : 'max-h-0'
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-300">
                        <p className="text-sm text-gray-700 leading-relaxed text-left">
                          {speaker.bio[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* VENUE */}
      {content.sectionVisibility?.venue !== false && (
      <section id="venue" className="bg-white py-16 sm:py-20" style={{ fontFamily: getSectionFont('venue') }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#21263A] mb-4">
              {content.venue.title[lang]}
            </h3>
            <div className="w-24 h-1 bg-[#21263A] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Side - Google Map */}
            <div className="order-2 md:order-1">
              <div className="sticky top-24">
                <iframe
                  title="Venue Location Map"
                  src={content.venue.mapUrl}
                  width="100%"
                  height="500"
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-2xl border-2 border-[#21263A]/20 shadow-xl"
                ></iframe>
                <a
                  href={content.venue.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center space-x-2 bg-[#21263A] hover:bg-[#2d3449] text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{lang === "en" ? "Open in Google Maps" : "გახსნა Google Maps-ში"}</span>
                </a>
              </div>
            </div>

            {/* Right Side - Venue Info + Gallery */}
            <div className="space-y-6 order-1 md:order-2">
              {/* Venue Name */}
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#21263A] mb-2">
                  {content.venue.name[lang]}
                </h4>
                <p className="text-lg text-gray-600 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#21263A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{content.venue.address[lang]}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed text-base">
                {content.venue.description[lang]}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {content.venue.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#21263A]"></div>
                    <span className="text-gray-700">{feature[lang]}</span>
                  </div>
                ))}
              </div>

              {/* Venue Gallery */}
              <div className="pt-4">
                <h5 className="text-xl font-bold text-[#21263A] mb-4">
                  {lang === "en" ? "Venue Photos" : "ვენიუს ფოტოები"}
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  {content.venue.gallery.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedVenueImage(index)}
                      className="relative h-32 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Zoom icon overlay */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* AGENDA */}
      {content.sectionVisibility?.agenda !== false && (
      <section id="agenda" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-[#21263A]/5 relative overflow-hidden" style={{ fontFamily: getSectionFont('agenda') }}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#21263A] rounded-full mix-blend-multiply filter blur-3xl animate-pulse-subtle"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#21263A] rounded-full mix-blend-multiply filter blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#21263A] mb-4">
              {t[lang].agenda}
            </h3>
            <div className="w-24 h-1 bg-[#21263A] mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#21263A]/30 transform -translate-x-1/2 rounded-full shadow-lg"></div>

            {/* Timeline Items */}
            <div className="space-y-8 pb-4">
              {content.agenda.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                >
                  {/* Enhanced Timeline Dot with Pulse Animation */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20 top-6">
                    <div className="relative">
                      <div className="absolute inset-0 w-6 h-6 bg-[#21263A]/40 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-6 h-6 bg-[#21263A] rounded-full border-4 border-white shadow-xl flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Content Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-20 md:pl-0`}>
                    <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden text-left">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-[#21263A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Accent bar */}
                      <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-0 bottom-0 w-1.5 bg-[#21263A] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top`}></div>

                      <div className="relative z-10">
                        {/* Time Badge */}
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#21263A] text-white font-bold text-sm mb-4 shadow-md`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{item.time}</span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#21263A] transition-all duration-300">
                          {item.title[lang]}
                        </h4>

                        {/* Speaker */}
                        {item.speaker && item.speaker[lang] && (
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-[#21263A] flex items-center justify-center text-white font-semibold text-sm">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <p className="text-base font-semibold text-[#21263A]">
                              {item.speaker[lang]}
                            </p>
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed">
                          {item.description[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* REGISTRATION */}
      {content.sectionVisibility?.registration !== false && (
      <section
        id="registration"
        className="bg-gradient-to-br from-gray-50 via-gray-100 to-[#21263A]/5 py-16 sm:py-20 text-center relative overflow-hidden"
        style={{ fontFamily: getSectionFont('registration') }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#21263A] rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#21263A] mb-4">
            {t[lang].registration}
          </h3>
          <div className="w-24 h-1 bg-[#21263A] mx-auto rounded-full mb-6"></div>

          <p className="text-lg text-gray-700 mb-8">{t[lang].free}</p>

          <a
            href={content.registration.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-[#21263A] text-white px-10 py-4 rounded-xl hover:bg-[#2d3449] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl font-semibold text-lg"
          >
            <span>{t[lang].register}</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#21263A] text-white py-10 text-center border-t-4 border-[#2d3449]">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-base font-medium">{t[lang].rights}</p>
        </div>
      </footer>

      {/* FLOATING REGISTRATION BUTTON */}
      {showFloatingButton && (
        <a
          href={content.registration.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-[#21263A] hover:bg-[#2d3449] text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center space-x-2"
          style={{
            animation: 'slideInRight 0.5s ease-out'
          }}
        >
          <span className="font-semibold">{t[lang].register}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      )}

      {/* VENUE IMAGE MODAL */}
      {selectedVenueImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedVenueImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedVenueImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[101]"
            aria-label="Close modal"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVenueImage((prev) => (prev - 1 + content.venue.gallery.length) % content.venue.gallery.length);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#21263A]/80 hover:bg-[#21263A] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-[101]"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={content.venue.gallery[selectedVenueImage]}
              alt={`Venue ${selectedVenueImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#21263A]/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedVenueImage + 1} / {content.venue.gallery.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVenueImage((prev) => (prev + 1) % content.venue.gallery.length);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#21263A]/80 hover:bg-[#21263A] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-[101]"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ARCHITECTS CLUB IMAGE MODAL */}
      {selectedClubImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedClubImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedClubImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[101]"
            aria-label="Close modal"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedClubImage((prev) => (prev - 1 + clubImages.length) % clubImages.length);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#21263A]/80 hover:bg-[#21263A] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-[101]"
            aria-label="Previous image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={clubImages[selectedClubImage]}
              alt={`Event ${selectedClubImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#21263A]/80 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {selectedClubImage + 1} / {clubImages.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedClubImage((prev) => (prev + 1) % clubImages.length);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#21263A]/80 hover:bg-[#21263A] text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-[101]"
            aria-label="Next image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}
