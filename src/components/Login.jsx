import { useState } from "react";

function Login({ isVisible, onClose, onSwitchToCreateAccount }) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de login
    console.log("Dados do login:", formData);
  };

  console.log("Login render - isVisible:", isVisible);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen bg-dark-900 flex">
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

      {/* Lado esquerdo - Formulário de Login */}
      <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
            <svg
              className="w-6 h-6 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">MEU BOLSO</span>
        </div>

        {/* Título */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Entrar na conta
          </h1>
          <p className="text-gray-400 text-lg">
            Entre com sua conta e tenha acesso completo
            <br />
            ao seu controle financeiro
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-white font-medium mb-2">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                className="w-full bg-dark-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
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
                    className="w-5 h-5"
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

          {/* Opções extras */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-600 rounded bg-dark-700"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 mt-8"
          >
            Entrar
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-900 text-gray-400">ou</span>
            </div>
          </div>

          {/* Botões de login social */}
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-600 rounded-lg shadow-sm bg-dark-700 text-white hover:bg-dark-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Entrar com Google
            </button>
          </div>

          {/* Link para criar conta */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Não tem uma conta?{" "}
              <button
                type="button"
                className="text-yellow-400 hover:text-yellow-300 transition-colors underline"
                onClick={onSwitchToCreateAccount}
              >
                Criar conta gratuita
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Lado direito - Imagem do celular (mesmo da tela de criar conta) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 p-8">
        <div className="relative">
          {/* Mockup do celular */}
          <div className="w-80 h-[600px] bg-gray-800 rounded-[3rem] p-4 shadow-2xl">
            <div className="w-full h-full bg-black rounded-[2.5rem] relative overflow-hidden">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-black flex items-center justify-between px-6 text-xs text-white">
                <span>9:41</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-2 border border-white rounded-sm">
                    <div className="w-3/4 h-full bg-white rounded-sm"></div>
                  </div>
                </div>
              </div>

              {/* App content */}
              <div className="mt-8 p-4 h-full">
                {/* Header do app */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      </svg>
                    </div>
                    <span className="text-white font-bold">Meu Bolso</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                </div>

                {/* Saldo */}
                <div className="bg-gray-800 rounded-2xl p-4 mb-4">
                  <p className="text-gray-400 text-sm mb-1">Saldo disponível</p>
                  <p className="text-white text-2xl font-bold">R$ 2.847,52</p>
                </div>

                {/* Botões de ação */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="bg-green-500 text-white py-3 rounded-xl font-semibold">
                    Depositar
                  </button>
                  <button className="bg-gray-700 text-white py-3 rounded-xl font-semibold">
                    Pix
                  </button>
                </div>

                {/* Lista de transações */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold mb-3">
                    Últimas transações
                  </h3>

                  <div className="flex items-center justify-between bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs">💰</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          Sua transferência para João
                        </p>
                        <p className="text-gray-400 text-xs">Hoje às 14:30</p>
                      </div>
                    </div>
                    <p className="text-green-400 font-semibold">-R$ 150,00</p>
                  </div>

                  <div className="flex items-center justify-between bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs">🏪</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          Depósito recebido
                        </p>
                        <p className="text-gray-400 text-xs">Ontem às 09:15</p>
                      </div>
                    </div>
                    <p className="text-green-400 font-semibold">+R$ 850,00</p>
                  </div>

                  <div className="flex items-center justify-between bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs">🛒</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">
                          Compra no supermercado
                        </p>
                        <p className="text-gray-400 text-xs">2 dias atrás</p>
                      </div>
                    </div>
                    <p className="text-red-400 font-semibold">-R$ 245,80</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Texto promocional */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-gray-400 text-lg">Bem-vindo de volta!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
