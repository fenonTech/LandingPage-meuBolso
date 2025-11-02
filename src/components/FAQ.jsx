import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(4); // Last question open by default
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  const faqs = [
    {
      question: "O que é o Open Finance?",
      answer: "",
    },
    {
      question: "Posso conectar mais de um banco?",
      answer: "",
    },
    {
      question: "Preciso fornecer minhas senhas bancárias ao Meu Bolso?",
      answer: "",
    },
    {
      question: "O Meu Bolso consegue efetuar transações e pagamentos?",
      answer: "",
    },
    {
      question: "Preciso configurar ou instalar algo no app do meu banco?",
      answer:
        "Não. O Meu Bolso usa o Open Finance, uma tecnologia autorizada pelo Banco Central, que permite integração segura sem necessidade de instalar nada nos apps dos bancos. Você só precisa autorizar o acesso aos seus dados financeiros uma vez, e o Pierre fará o resto automaticamente.",
    },
  ];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="bg-black py-16 sm:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* FAQ Section */}
        <div className="mb-16 sm:mb-20">
          {/* FAQ Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div
              className={`bg-yellow-400 text-black px-5 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-700 ${
                isVisible ? "animate-scale-in" : "opacity-0 transform scale-75"
              }`}
            >
              FAQ
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center mb-10 sm:mb-12">
            <h1
              className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-1000 delay-200 px-4 ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              Descubra nossas
              <br />
              <span className="text-yellow-400">Perguntas Frequentes</span>
            </h1>
            <p
              className={`text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-400 px-4 leading-relaxed ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              Encontre as respostas para as dúvidas mais comuns sobre o Meu
              Bolso
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-black rounded-xl border border-gray-800 overflow-hidden hover-lift smooth-transition transition-all duration-700 ${
                  isVisible
                    ? "animate-fade-in-up"
                    : "opacity-0 transform translate-y-4"
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-900/30 smooth-transition active:bg-gray-900/50"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="text-base sm:text-lg font-semibold text-white pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openIndex === index && faq.answer && (
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 border-t border-gray-800">
                    <p className="text-gray-300 leading-relaxed pt-3 sm:pt-4 text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 rounded-2xl p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div
              className={`lg:col-span-3 text-center lg:text-left transition-all duration-1000 delay-1200 ${
                isVisible
                  ? "animate-fade-in-left"
                  : "opacity-0 transform translate-x-[-30px]"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                Pronto para organizar suas finanças?
              </h2>

              <a
                href="#plans"
                className="gradient-button text-white px-8 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg smooth-transition hover-lift inline-flex items-center animate-pulse-slow active:scale-95 shadow-2xl w-full sm:w-auto justify-center"
              >
                <img
                  src="/imgs/relogio.png"
                  alt="Relógio"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-float flex-shrink-0"
                />
                <span>Escolha seu plano</span>
              </a>
            </div>

            {/* Right Content - Features List */}
            <div
              className={`lg:col-span-2 space-y-4 transition-all duration-1000 delay-1400 ${
                isVisible
                  ? "animate-fade-in-right"
                  : "opacity-0 transform translate-x-[30px]"
              }`}
            >
              <div className="flex items-center hover-lift smooth-transition active:scale-95">
                <img
                  src="/imgs/check.png"
                  alt="Check"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0"
                />
                <span className="text-gray-300 font-medium text-sm sm:text-base">
                  Análise avançada com IA
                </span>
              </div>
              <div className="flex items-center hover-lift smooth-transition active:scale-95">
                <img
                  src="/imgs/check.png"
                  alt="Check"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0"
                />
                <span className="text-gray-300 font-medium text-sm sm:text-base">
                  Registro de entrada e saída
                </span>
              </div>
              <div className="flex items-center hover-lift smooth-transition active:scale-95">
                <img
                  src="/imgs/check.png"
                  alt="Check"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0"
                />
                <span className="text-gray-300 font-medium text-sm sm:text-base">
                  Dashboard completo
                </span>
              </div>
              <div className="flex items-center hover-lift smooth-transition active:scale-95">
                <img
                  src="/imgs/check.png"
                  alt="Check"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0"
                />
                <span className="text-gray-300 font-medium text-sm sm:text-base">
                  Open Finance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
