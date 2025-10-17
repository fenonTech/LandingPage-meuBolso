export default function Hero() {
  return (
    <section className="bg-black min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Floating card on the left - responsive sizes */}
        <div className="absolute -left-4 sm:-left-6 md:-left-8 top-1/2 transform -translate-y-1/2 -rotate-12 animate-fade-in-left animate-float">
          <img 
            src="/cartao.png" 
            alt="Cartão Meu Bolso" 
            className="w-32 sm:w-48 md:w-64 lg:w-84 h-auto shadow-2xl rounded-2xl hover-lift smooth-transition"
          />
        </div>

      </div>

      {/* Floating safe/vault on the right - responsive sizes */}
      <div className="absolute -right-2 sm:-right-3 md:-right-4 bottom-8 sm:bottom-12 md:bottom-16 z-50 animate-fade-in-right animate-pulse-slow">
        <div className="relative">
          <img src="/cofrepng.png" alt="Cofre" className="w-16 h-16 sm:w-24 sm:h-24 md:w-64 md:h-64 lg:w-84 lg:h-84 hover-lift smooth-transition" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl animate-fade-in-up px-4" style={{ animationDelay: '0.2s' }}>
            Seu assistente de IA<br />
            <span className="text-yellow-400">Pessoal de Finanças</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
            Com o Meu Bolso você entende, acompanha e planeja seu dinheiro de forma simples,
            <span className="hidden sm:inline"><br /></span>
            <span className="sm:hidden"> </span>
            sem planilhas. Tenha mais controle, clareza e tranquilidade sobre suas finanças
          </p>
          
          {/* Social icons */}
          <div className="flex items-center gap-4 sm:gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a href="#" className="flex items-center text-pink-500 hover:text-pink-400 smooth-transition hover-lift">
              <img src="/instagram.png" alt="Instagram" className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="font-medium text-sm sm:text-base">Instagram</span>
            </a>
            <a href="#" className="flex items-center text-green-500 hover:text-green-400 smooth-transition hover-lift">
              <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="font-medium text-sm sm:text-base">WhatsApp</span>
            </a>
          </div>
          
          {/* CTA Button */}
          <button className="gradient-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg smooth-transition inline-flex items-center shadow-2xl hover-lift animate-scale-in" style={{ animationDelay: '0.8s' }}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Começar com 5 dias grátis</span>
            <span className="sm:hidden">Começar grátis</span>
          </button>
        </div>
      </div>
    </section>
  )
}
