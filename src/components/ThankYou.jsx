import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "https://backend-pearl-rho-82.vercel.app/api";

function Spinner() {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-dark-700" />
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}

function ThankYou() {
  const whatsappLink = "https://wa.me/5511918682080";
  const [activationStatus, setActivationStatus] = useState("idle"); // "idle" | "loading" | "done" | "error"
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;

    const raw = localStorage.getItem("pendingCardBilling");
    if (!raw) return;

    let parsed;
    try { parsed = JSON.parse(raw); } catch {
      localStorage.removeItem("pendingCardBilling");
      return;
    }

    const { billingId, nomeProduto, email, telefone, isTeste } = parsed;
    if (!billingId || !nomeProduto || !email) {
      localStorage.removeItem("pendingCardBilling");
      return;
    }

    calledRef.current = true;
    setActivationStatus("loading");

    const basePath = isTeste ? "pagamentos/teste" : "pagamentos";
    const confirmUrl = `${API_BASE_URL}/${basePath}/cartao/confirmar`;

    fetch(confirmUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ billingId, nomeProduto, email, telefone }),
    })
      .then((res) => res.json().catch(() => ({ status: false })))
      .then((data) => {
        localStorage.removeItem("pendingCardBilling");
        console.log("[ThankYou] Resposta da ativação:", data);
        setActivationStatus(data?.status === true ? "done" : "error");
      })
      .catch((err) => {
        console.error("[ThankYou] Erro ao confirmar pagamento:", err);
        localStorage.removeItem("pendingCardBilling");
        setActivationStatus("error");
      });
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-dark-800 border border-dark-700 rounded-2xl p-8 text-center">
        <img
          src="/landingpage/imgs/logoHeader.png"
          alt="Meu Bolso"
          className="h-14 w-auto mx-auto mb-6"
        />

        {activationStatus === "loading" ? (
          <>
            <Spinner />
            <h1 className="text-2xl font-bold mb-3">Ativando sua assinatura...</h1>
            <p className="text-gray-400 text-sm">
              Estamos registrando seu pagamento. Aguarde um instante.
            </p>
          </>
        ) : activationStatus === "error" ? (
          <>
            <div className="text-4xl mb-4">📱</div>
            <h1 className="text-2xl font-bold mb-3">Pagamento recebido!</h1>
            <p className="text-gray-300 mb-8">
              Seu pagamento foi confirmado. A ativação do plano será concluída em breve.
              Continue pelo WhatsApp para acompanhar.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">💛</div>
            <h1 className="text-3xl font-bold mb-3">Obrigado pela compra!</h1>
            <p className="text-gray-300 mb-8">
              {activationStatus === "done"
                ? "Seu plano foi ativado com sucesso! Continue pelo WhatsApp."
                : "Sua compra foi registrada com sucesso. Continue pelo WhatsApp."}
            </p>
          </>
        )}

        {activationStatus !== "loading" && (
          <>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex justify-center bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg transition-colors"
            >
              Continuar pelo WhatsApp
            </a>
            <Link
              to="/"
              className="inline-block mt-4 text-sm text-yellow-400 hover:text-yellow-300"
            >
              Voltar para página inicial
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default ThankYou;
