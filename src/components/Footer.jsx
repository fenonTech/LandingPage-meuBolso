export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <img 
              src="/logoHeader.png" 
              alt="Meu Bolso" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 mb-6 max-w-md">
              Sua conta digital completa, gratuita e sem complicação. 
              Gerencie seu dinheiro de forma inteligente com o Meu Bolso.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-yellow transition-colors">
                <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-yellow transition-colors">
                <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Conta Digital</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cartão de Crédito</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investimentos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Open Finance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">WhatsApp Pay</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Segurança</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Meu Bolso. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Meu Bolso S.A. - CNPJ: 00.000.000/0001-00</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
