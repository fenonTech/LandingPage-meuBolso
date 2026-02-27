import { Link } from "react-router-dom";

function ThankYou() {
  const whatsappLink = "https://wa.me/5511918682080";

  return (
    <div className="min-h-screen bg-dark-900 text-white px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-dark-800 border border-dark-700 rounded-2xl p-8 text-center">
        <img
          src="/landingpage/imgs/logoHeader.png"
          alt="Meu Bolso"
          className="h-14 w-auto mx-auto mb-4"
        />

        <h1 className="text-3xl font-bold mb-3">
          Obrigado pela compra <span className="text-yellow-400">💛</span>
        </h1>
        <p className="text-gray-300 mb-8">
          Sua compra foi registrada com sucesso. Para continuar seu atendimento,
          siga pelo nosso WhatsApp.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg"
        >
          Continuar pelo WhatsApp
        </a>

        <Link
          to="/"
          className="inline-block mt-4 text-sm text-yellow-400 hover:text-yellow-300"
        >
          Voltar para página inicial
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
