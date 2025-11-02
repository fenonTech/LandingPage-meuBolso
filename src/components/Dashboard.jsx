import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Dashboard() {
  const [sectionRef, isVisible] = useScrollAnimation(0.2);

  return (
    <section
      ref={sectionRef}
      className="bg-black min-h-screen relative overflow-hidden"
    >
      {/* Money 3D image positioned on the left - responsive sizes */}
      <div
        className={`absolute left-0 bottom-4 sm:bottom-6 md:bottom-8 z-10 transition-all duration-1000 ${
          isVisible
            ? "animate-fade-in-left animate-float"
            : "opacity-0 transform translate-x-[-50px]"
        }`}
      >
        <img
          src="/imgs/dinheiro.png"
          alt="Dinheiro 3D"
          className="w-20 sm:w-32 md:w-64 lg:w-84 h-auto hover-lift smooth-transition"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        <div className="flex flex-col items-center  min-h-screen py-10 sm:py-20">
          {/* Dashboard Image */}
          <div
            className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? "animate-scale-in" : "opacity-0 transform scale-90"
            }`}
          >
            <img
              src="/imgs/dashboard.png"
              alt="Dashboard Financeiro"
              className="w-full max-w-xs sm:max-w-2xl lg:max-w-5xl h-auto rounded-xl sm:rounded-2xl shadow-2xl hover-lift smooth-transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
