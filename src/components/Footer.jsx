export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-8 mb-10 sm:mb-12">
          {/* Logo and Description */}
          <div className="sm:col-span-2 md:col-span-2">
            <img
              src="/imgs/logoHeader.png"
              alt="Meu Bolso"
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-md leading-relaxed">
              Sua conta digital completa, gratuita e sem complicação. Gerencie
              seu dinheiro de forma inteligente com o Meu Bolso.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-yellow transition-colors active:scale-95"
              >
                <img
                  src="/imgs/instagram.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-yellow transition-colors active:scale-95"
              >
                <img
                  src="/imgs/whatsapp.png"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">
              Produtos
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Conta Digital
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Cartão de Crédito
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Investimentos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Open Finance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  WhatsApp Pay
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Fale Conosco
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Segurança
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm active:text-yellow-400"
                >
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2024 Meu Bolso. Todos os direitos reservados.
          </p>
          <div className="flex items-center text-xs sm:text-sm text-gray-400 text-center md:text-right">
            <span className="leading-relaxed">
              Meu Bolso S.A. - CNPJ: 00.000.000/0001-00
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
