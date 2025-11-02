import { useState } from "react";

function CreateAccount({ isVisible, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    cpf: "",
    banco: "",
    senha: "",
    confirmarSenha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatWhatsApp = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleCPFChange = (e) => {
    const formatted = formatCPF(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cpf: formatted,
    }));
  };

  const handleWhatsAppChange = (e) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData((prev) => ({
      ...prev,
      whatsapp: formatted,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  console.log("CreateAccount render - isVisible:", isVisible);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* Botão de voltar */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors z-10 flex items-center"
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar
      </button>

      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 p-6 lg:p-12 max-w-md mx-auto flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center mb-8 mt-16 lg:mt-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3">
            <img src="/imgs/logoHeader.png" alt="Logo" className="w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-yellow-400">MEU BOLSO</span>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">Criar conta</h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Crie sua conta em poucos minutos e tenha
            <br />
            controle total do seu bolso
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="meubolso@meubolso.com"
              className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              required
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Whatsapp
            </label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleWhatsAppChange}
              placeholder="(11) 90000-0000"
              maxLength={15}
              className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              required
            />
          </div>

          {/* CPF */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              CPF
            </label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleCPFChange}
              placeholder="123.456.789-00"
              maxLength={14}
              className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              required
            />
          </div>

          {/* Selecione seu banco */}
          <div className="relative">
            <label className="block text-white font-medium mb-2 text-sm">
              Selecione seu banco
            </label>
            <select
              name="banco"
              value={formData.banco}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none cursor-pointer text-sm"
              required
              style={{ color: formData.banco ? "white" : "#9CA3AF" }}
            >
              <option value="" style={{ color: "#9CA3AF" }}>
                Selecione um banco
              </option>
              <option value="banco-do-brasil" style={{ color: "white" }}>
                Banco do Brasil
              </option>
              <option value="bradesco" style={{ color: "white" }}>
                Bradesco
              </option>
              <option value="caixa" style={{ color: "white" }}>
                Caixa Econômica Federal
              </option>
              <option value="itau" style={{ color: "white" }}>
                Itaú
              </option>
              <option value="santander" style={{ color: "white" }}>
                Santander
              </option>
              <option value="nubank" style={{ color: "white" }}>
                Nubank
              </option>
              <option value="inter" style={{ color: "white" }}>
                Banco Inter
              </option>
              <option value="c6" style={{ color: "white" }}>
                C6 Bank
              </option>
              <option value="next" style={{ color: "white" }}>
                Next
              </option>
              <option value="original" style={{ color: "white" }}>
                Banco Original
              </option>
              <option value="outros" style={{ color: "white" }}>
                Outros
              </option>
            </select>
            {/* Ícone da seta do select */}
            <div className="absolute right-4 top-10 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
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
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Crie uma senha segura
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-2.121-2.121m4.242 4.242L14.12 14.12m0 0l2.121 2.121M14.12 14.12l2.121-2.121m-2.121 2.121L12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.066 7-9.543 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Confirme sua senha
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                placeholder="Digite a senha novamente"
                className="w-full bg-gray-800 border-0 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-2.121-2.121m4.242 4.242L14.12 14.12m0 0l2.121 2.121M14.12 14.12l2.121-2.121m-2.121 2.121L12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.066 7-9.543 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botão Criar conta */}
          <button
            type="submit"
            className="w-full bg-gray-300 hover:bg-gray-200 text-black font-semibold py-3 rounded-md transition-colors mt-6 text-sm"
          >
            Criar conta gratuita
          </button>

          {/* Link para login */}
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Já tem uma conta?{" "}
              <button
                type="button"
                className="text-white hover:text-yellow-400 transition-colors underline"
                onClick={onSwitchToLogin}
              >
                Entrar
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Lado direito - Imagem do celular */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-black p-8 relative">
        <div className="relative">
          {/* Mockup do celular com perspectiva */}
          <div className="w-72 h-[580px] relative transform rotate-12 translate-x-8">
            {/* Sombra do telefone */}
            <div className="absolute inset-0 bg-black opacity-30 rounded-[2.5rem] transform translate-x-2 translate-y-2 blur-xl"></div>

            {/* Telefone */}
            <div className="relative w-full h-full bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border border-gray-700">
              <div className="w-full h-full bg-black rounded-[2rem] relative overflow-hidden">
                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-black flex items-center justify-between px-4 text-xs text-white z-10">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    {/* Bateria */}
                    <div className="w-6 h-3 border border-white rounded-sm flex items-center">
                      <div className="w-4 h-2 bg-white rounded-sm ml-0.5"></div>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do app */}
                <div className="pt-8 p-4 h-full bg-gradient-to-b from-gray-900 to-black">
                  {/* Header do app */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-yellow-400 rounded-md flex items-center justify-center mr-2">
                        <span className="text-black text-xs font-bold">₿</span>
                      </div>
                      <span className="text-white font-bold text-sm">
                        Meu Bolso
                      </span>
                    </div>
                    <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  </div>

                  {/* Cards de transações simulando o app real */}
                  <div className="space-y-2 mt-8">
                    {/* Card principal */}
                    <div className="bg-green-600 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs opacity-80">
                          Disponível para saque
                        </span>
                        <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full"></div>
                      </div>
                      <p className="text-lg font-bold">R$ 2.847,52</p>
                      <div className="flex mt-3 space-x-2">
                        <button className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
                          Depositar
                        </button>
                        <button className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs">
                          Pix
                        </button>
                      </div>
                    </div>

                    {/* Lista de transações */}
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                            <span className="text-white text-xs">💰</span>
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">
                              Essa transferência vale pontos
                            </p>
                            <p className="text-gray-400 text-xs">
                              Vamos destravá-los?
                            </p>
                          </div>
                        </div>
                        <p className="text-white text-xs">R$ 150,00</p>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2">
                            <span className="text-white text-xs">�</span>
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">
                              Sua transferência foi
                            </p>
                            <p className="text-gray-400 text-xs">compensada</p>
                          </div>
                        </div>
                        <p className="text-green-400 text-xs">+R$ 850,00</p>
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-2">
                            <span className="text-white text-xs">🛒</span>
                          </div>
                          <div>
                            <p className="text-white text-xs font-medium">
                              Tá na conta nossa cada
                            </p>
                            <p className="text-gray-400 text-xs">
                              compra que você faz !
                            </p>
                          </div>
                        </div>
                        <p className="text-red-400 text-xs">-R$ 245,80</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Texto promocional */}
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-gray-400 text-base whitespace-nowrap">
              Comece sua jornada de economia!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
