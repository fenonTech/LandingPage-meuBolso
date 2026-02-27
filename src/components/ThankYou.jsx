import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://backend-pearl-rho-82.vercel.app/api";

function ThankYou() {
  const whatsappLink = "https://wa.me/5511918682080";
  const [activationStatus, setActivationStatus] = useState("idle"); // "idle" | "checking" | "done" | "error"
  const pollingRef = useRef(null);
  const attemptsRef = useRef(0);
  const MAX_ATTEMPTS = 12; // 12 x 5s = 60s máximo

  useEffect(() => {
    const raw = localStorage.getItem("pendingCardBilling");
    if (!raw) return;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      localStorage.removeItem("pendingCardBilling");
      return;
    }

    const { billingId, isTeste } = parsed;
    if (!billingId) {
      localStorage.removeItem("pendingCardBilling");
      return;
    }

    const basePath = isTeste ? "pagamentos/teste" : "pagamentos";
    const statusUrl = `${API_BASE_URL}/${basePath}/cartao/${billingId}/status`;

    setActivationStatus("checking");

    const poll = async () => {
      attemptsRef.current += 1;

      try {
        const res = await fetch(statusUrl, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json().catch(() => ({}));

        if (data?.cartao?.pago === true) {
          clearInterval(pollingRef.current);
          localStorage.removeItem("pendingCardBilling");
          setActivationStatus("done");
          return;
        }
      } catch {
        // ignora erro de rede, tenta novamente
      }

      if (attemptsRef.current >= MAX_ATTEMPTS) {
        clearInterval(pollingRef.current);
        localStorage.removeItem("pendingCardBilling");
        setActivationStatus("error");
      }
    };

    // Primeira tentativa imediata
    poll();
    pollingRef.current = setInterval(poll, 5000);

    return () => clearInterval(pollingRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-dark-800 border border-dark-700 rounded-2xl p-8 text-center">
        <img
          src="/landingpage/imgs/logoHeader.png"
          alt="Meu Bolso"
          className="h-14 w-auto mx-auto mb-4"
        />

        {activationStatus === "checking" ? (
          <>
            <h1 className="text-3xl font-bold mb-3">
              Ativando sua assinatura <span className="text-yellow-400">⏳</span>
            </h1>
            <p className="text-gray-300 mb-8 animate-pulse">
              Confirmando seu pagamento e ativando o plano...
            </p>
          </>
        ) : activationStatus === "error" ? (
          <>
            <h1 className="text-3xl font-bold mb-3">
              Pagamento recebido <span className="text-yellow-400">💛</span>
            </h1>
            <p className="text-gray-300 mb-8">
              Sua compra foi registrada. A ativação será concluída em breve. Pode continuar pelo WhatsApp.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-3">
              Obrigado pela compra <span className="text-yellow-400">💛</span>
            </h1>
            <p className="text-gray-300 mb-8">
              Sua compra foi registrada com sucesso. Para continuar seu atendimento,
              siga pelo nosso WhatsApp.
            </p>
          </>
        )}

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
