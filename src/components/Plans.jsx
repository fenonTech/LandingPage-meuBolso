import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation'

export default function Plans() {
  const [sectionRef, isVisible] = useScrollAnimation(0.2)
  const [plan1Ref, plan1Visible] = useStaggeredAnimation(200)
  const [plan2Ref, plan2Visible] = useStaggeredAnimation(400)
  const [plan3Ref, plan3Visible] = useStaggeredAnimation(600)

  return (
    <section ref={sectionRef} className="bg-black min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          {/* Plans Badge */}
          <div className={`bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm mb-8 transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0 transform scale-75'}`}>
            Planos e Preços
          </div>
          
          {/* Main heading */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl transition-all duration-1000 delay-200 px-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}`}>
            Seu futuro começa com<br />
            <span className="text-yellow-400">Plano Meu bolso</span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-base sm:text-lg text-gray-300 mb-12 leading-relaxed transition-all duration-1000 delay-400 px-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}`}>
            Selecione o plano ideal para organizar tudo que entra e sai do seu bolso
          </p>
          
          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 px-4">
            {/* Plano Essencial */}
            <div ref={plan1Ref} className={`bg-gray-900 rounded-2xl p-6 border border-gray-800 hover-lift smooth-transition transition-all duration-1000 ${plan1Visible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}`}>
              <h3 className="text-white text-lg font-bold mb-2">Plano Essencial</h3>
              <div className="mb-4">
                <span className="text-white text-3xl font-bold">R$ 19,90</span>
                <span className="text-gray-400 text-sm">/mês</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">Para quem quer apenas acompanhar gastos básicos</p>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Análise avançada com IA
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Registro de entrada e saída
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Dashboard completo
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Open Finance
                </li>
                <li className="flex items-center text-red-400">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✗</span>
                  </div>
                  Conta Compartilhada
                </li>
              </ul>
            </div>

            {/* Plano Inteligente - Highlighted */}
            <div ref={plan2Ref} className={`bg-gray-900 rounded-2xl p-6 border-2 border-yellow-400 relative hover-lift smooth-transition animate-pulse-slow transition-all duration-1000 ${plan2Visible ? 'animate-scale-in' : 'opacity-0 transform scale-90'}`}>
              <h3 className="text-white text-lg font-bold mb-2">Plano Inteligente</h3>
              <div className="mb-4">
                <span className="text-white text-3xl font-bold">R$ 37,90</span>
                <span className="text-gray-400 text-sm">/mês</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">Para apostas, alertas e comparativos semanais mensais</p>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Tudo do plano essencial
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Open Finance
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Planejamento de gastos
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Alertas baseados em gastos
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Conta Compartilhada
                </li>
                <li className="flex items-center text-red-400">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✗</span>
                  </div>
                  Consultoria com Agente IA
                </li>
              </ul>
            </div>

            {/* Plano Visionário */}
            <div ref={plan3Ref} className={`bg-gray-900 rounded-2xl p-6 border border-gray-800 hover-lift smooth-transition transition-all duration-1000 ${plan3Visible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-8'}`}>
              <h3 className="text-white text-lg font-bold mb-2">Plano Visionário</h3>
              <div className="mb-4">
                <span className="text-white text-3xl font-bold">R$ 54,90</span>
                <span className="text-gray-400 text-sm">/mês</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">Foco em planejamento de longo prazo, metas e investimentos</p>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Tudo do plano inteligente
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Consultoria com agente IA
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Open Finance
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Lembretes de vencimento
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Budget mensal
                </li>
              </ul>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className={`gradient-button text-white px-8 py-4 rounded-full font-bold text-lg smooth-transition hover-lift transition-all duration-1000 delay-800 ${isVisible ? 'animate-scale-in' : 'opacity-0 transform scale-75'}`}>
            Teste todas as funcionalidades por 5 dias
          </button>
        </div>
      </div>
    </section>
  )
}
