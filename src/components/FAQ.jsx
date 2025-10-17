import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(4) // Last question open by default
  const [sectionRef, isVisible] = useScrollAnimation(0.1)
  
  const faqs = [
    {
      question: "O que é o Open Finance?",
      answer: ""
    },
    {
      question: "Posso conectar mais de um banco?",
      answer: ""
    },
    {
      question: "Preciso fornecer minhas senhas bancárias ao Meu Bolso?",
      answer: ""
    },
    {
      question: "O Meu Bolso consegue efetuar transações e pagamentos?",
      answer: ""
    },
    {
      question: "Preciso configurar ou instalar algo no app do meu banco?",
      answer: "Não. O Meu Bolso usa o Open Finance, uma tecnologia autorizada pelo Banco Central, que permite integração segura sem necessidade de instalar nada nos apps dos bancos. Você só precisa autorizar o acesso aos seus dados financeiros uma vez, e o Pierre fará o resto automaticamente."
    }
  ]

  return (
    <section ref={sectionRef} className="bg-black py-32 relative overflow-hidden" style={{ minHeight: '120vh' }}>
      

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* FAQ Section */}
        <div className="mb-20">
          {/* FAQ Badge */}
          <div className="flex justify-center mb-8">
            <div className={`bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 transform scale-75'}`}>
              FAQ
            </div>
          </div>
          
          {/* Main heading */}
          <div className="text-center mb-12">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight transition-all duration-1000 delay-200 px-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}`}>
              Descubra nossas<br />
              <span className="text-yellow-400">Perguntas Frequentes</span>
            </h1>
            <p className={`text-base sm:text-lg text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-400 px-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}`}>
              Encontre as respostas para as dúvidas mais comuns sobre o Meu Bolso
            </p>
          </div>
          
          {/* FAQ Items */}
          <div className="space-y-4 max-w-4xl mx-auto px-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover-lift smooth-transition transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-4'}`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-800 smooth-transition"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </span>
                  <svg 
                    className={`w-6 h-6 text-white transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openIndex === index && faq.answer && (
                  <div className="px-6 pb-6 border-t border-gray-800">
                    <p className="text-gray-300 leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ml-0 sm:ml-6 lg:ml-12 px-4">
          {/* Left Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 delay-1200 ${isVisible ? 'animate-fade-in-left' : 'opacity-0 transform translate-x-[-30px]'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              Pronto para organizar suas<br />
              finanças?
            </h2>
            
            <button className="gradient-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg smooth-transition hover-lift inline-flex items-center animate-pulse-slow">
              <img src="/relogio.png" alt="Relógio" className="w-5 h-5 sm:w-6 sm:h-6 mr-2 animate-float" />
              <span className="hidden sm:inline">Começar com 5 dias grátis</span>
              <span className="sm:hidden">Começar grátis</span>
            </button>
          </div>
          
          {/* Right Content - Features List */}
          <div className={`space-y-4 transition-all duration-1000 delay-1400 ${isVisible ? 'animate-fade-in-right' : 'opacity-0 transform translate-x-[30px]'}`}>
            <div className="flex items-center hover-lift smooth-transition">
              <img src="/check.png" alt="Check" className="w-6 h-6 mr-3" />
              <span className="text-gray-300 font-medium">Tudo do plano inteligente</span>
            </div>
            <div className="flex items-center hover-lift smooth-transition">
              <img src="/check.png" alt="Check" className="w-6 h-6 mr-3" />
              <span className="text-gray-300 font-medium">Consultoria com Agente IA</span>
            </div>
            <div className="flex items-center hover-lift smooth-transition">
              <img src="/check.png" alt="Check" className="w-6 h-6 mr-3" />
              <span className="text-gray-300 font-medium">Open Finance</span>
            </div>
            <div className="flex items-center hover-lift smooth-transition">
              <img src="/check.png" alt="Check" className="w-6 h-6 mr-3" />
              <span className="text-gray-300 font-medium">Lembretes de cobrança</span>
            </div>
            <div className="flex items-center hover-lift smooth-transition">
              <img src="/check.png" alt="Check" className="w-6 h-6 mr-3" />
              <span className="text-gray-300 font-medium">Budget mensal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
