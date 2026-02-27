import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const plans = {
  plan1: {
    label: "Assinatura Essencial",
    description: "Plano mensal",
    values: { mensal: 990, trimestral: 2670, anual: 7800 },
  },
  plan2: {
    label: "Assinatura Intermediária",
    description: "Plano mensal",
    values: { mensal: 2090, trimestral: 5667, anual: 17880 },
  },
  plan3: {
    label: "Assinatura Premium",
    description: "Plano mensal",
    values: { mensal: 3990, trimestral: 11043, anual: 31080 },
  },
};

const formatCurrency = (valueInCents) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    (valueInCents || 0) / 100
  );

const API_BASE_URL = "https://backend-pearl-rho-82.vercel.app/api";
const TEST_PAYMENTS_BASE_PATH = "pagamentos/teste";

const getAbsoluteHashUrl = (hashPath) => {
  if (typeof window === "undefined") {
    return hashPath;
  }

  return `${window.location.origin}${window.location.pathname}#${hashPath}`;
};

function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const planId = searchParams.get("plano") || "plan1";
  const billingCycle = searchParams.get("periodo") || "mensal";
  const selectedPlan = useMemo(() => plans[planId] || plans.plan1, [planId]);
  const amountInCents = selectedPlan.values[billingCycle] || selectedPlan.values.mensal;

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixData, setPixData] = useState({ qrCode: "", pixCode: "", expiresAt: "" });
  const [pixId, setPixId] = useState(null);
  const [pixPollStatus, setPixPollStatus] = useState(""); // "" | "checking" | "paid" | "error"
  const pollingRef = useRef(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerTaxId: "",
    customerPhone: "",
  });

  const cardPayload = useMemo(
    () => ({
      nome_produto: selectedPlan.label,
      descricao: `${selectedPlan.description} (${billingCycle})`,
      quantidade: 1,
      valor_centavos: amountInCents,
      nome: formData.customerName,
      celular: formData.customerPhone,
      email: formData.customerEmail,
      cpf_cnpj: formData.customerTaxId,
      retorno_url: window.location.href,
      completion_url: getAbsoluteHashUrl("/obrigado"),
    }),
    [amountInCents, billingCycle, formData, selectedPlan]
  );

  const pixPayload = useMemo(
    () => ({
      amount: amountInCents,
      expiresIn: 1800,
      description: `${selectedPlan.label} (${billingCycle})`,
      name: formData.customerName,
      cellphone: formData.customerPhone,
      email: formData.customerEmail,
      taxId: formData.customerTaxId,
    }),
    [amountInCents, billingCycle, formData, selectedPlan]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyPix = async () => {
    if (!pixData.pixCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(pixData.pixCode);
      alert("Código Pix copiado com sucesso!");
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente o código.");
    }
  };

  const validateStep1 = () => {
    if (!formData.customerName || !formData.customerEmail || !formData.customerTaxId || !formData.customerPhone) {
      setErrorMessage("Preencha Nome, Email, Cpf/Cnpj e Telefone para continuar.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  // Polling: verifica o status do PIX a cada 5s enquanto o modal estiver aberto
  useEffect(() => {
    if (!showPixModal || !pixId) return;

    const poll = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/${TEST_PAYMENTS_BASE_PATH}/pix/${pixId}/status`,
          { headers: { "Content-Type": "application/json" } }
        );
        const statusData = await res.json().catch(() => ({}));

        if (statusData?.pix?.pago === true) {
          clearInterval(pollingRef.current);
          setPixPollStatus("paid");
          setShowPixModal(false);
          setPixId(null);
          navigate("/obrigado");
        }
      } catch {
        // ignora erros de polling silenciosamente
      }
    };

    pollingRef.current = setInterval(poll, 5000);
    return () => clearInterval(pollingRef.current);
  }, [showPixModal, pixId, navigate]);

  const handleClosePixModal = () => {
    clearInterval(pollingRef.current);
    setShowPixModal(false);
    setPixId(null);
    setPixPollStatus("");
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!validateStep1()) {
      return;
    }
    setStep(2);
  };

  const getPixValues = (responseData) => {
    const pix = responseData?.pix || responseData?.data?.pix || {};

    const pixCode =
      pix?.pix_copia_cola ||
      responseData?.pix_copia_cola ||
      responseData?.data?.pix_copia_cola ||
      "";

    const qrSource =
      pix?.qr_code_base64 ||
      pix?.qr_code ||
      responseData?.qr_code_base64 ||
      responseData?.qr_code ||
      "";

    const qrCode = qrSource
      ? qrSource.startsWith("data:image") || qrSource.startsWith("http")
        ? qrSource
        : `data:image/png;base64,${qrSource}`
      : "";

    const expiresAt = pix?.expires_at || responseData?.expires_at || "";
    const id = pix?.id || responseData?.data?.id || null;

    return { qrCode, pixCode, expiresAt, id };
  };

  const getCardRedirect = (responseData) =>
    responseData?.checkout_url ||
    responseData?.payment_url ||
    responseData?.redirect_url ||
    responseData?.url ||
    responseData?.data?.checkout_url ||
    responseData?.data?.payment_url ||
    responseData?.data?.redirect_url ||
    "";

  const createPayment = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const isPix = paymentMethod === "pix";
    const endpoint = isPix
      ? `${API_BASE_URL}/${TEST_PAYMENTS_BASE_PATH}/pix`
      : `${API_BASE_URL}/${TEST_PAYMENTS_BASE_PATH}/cartao`;

    const payload = isPix ? pixPayload : cardPayload;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const providerStatus = data?.erro?.provider_status;
        const providerData = data?.erro?.provider_data;
        const providerMessage =
          providerData?.message || providerData?.error || providerData?.description || "";
        const baseMessage =
          data?.erro?.message || data?.message || data?.erro || "Não foi possível criar o pagamento.";

        const details = [
          providerStatus ? `status provedor: ${providerStatus}` : "",
          providerMessage,
        ]
          .filter(Boolean)
          .join(" | ");

        throw new Error(details ? `${baseMessage} (${details})` : baseMessage);
      }

      if (paymentMethod === "pix") {
        const parsedPix = getPixValues(data);

        if (!parsedPix.qrCode && !parsedPix.pixCode) {
          throw new Error("A API não retornou qr_code ou pix_copia_cola.");
        }

        setPixData(parsedPix);
        setPixId(parsedPix.id);
        setPixPollStatus("checking");
        setShowPixModal(true);
        return;
      }

      const redirectUrl = getCardRedirect(data);

      if (!redirectUrl) {
        throw new Error("A API não retornou checkout_url para pagamento com cartão.");
      }

      // Salva dados do cliente no localStorage para ativar assinatura ao retornar
      const billingId =
        data?.pagamento?.data?.id ||
        data?.data?.id ||
        null;
      if (billingId) {
        localStorage.setItem(
          "pendingCardBilling",
          JSON.stringify({
            billingId,
            nomeProduto: selectedPlan.label,
            email: formData.customerEmail,
            telefone: formData.customerPhone,
            isTeste: true,
          }),
        );
      }

      window.location.href = redirectUrl;
    } catch (error) {
      setErrorMessage(error.message || "Erro ao criar pagamento.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    await createPayment();
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
        >
          ← Voltar
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-dark-800 border border-dark-700 rounded-2xl p-6">
            <h1 className="text-3xl font-bold mb-2">
              Checkout <span className="text-yellow-400">Meu Bolso</span>
            </h1>

            <StepIndicator step={step} />

            {errorMessage && (
              <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                {errorMessage}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-6 mt-6">
                <p className="text-gray-300">Preencha os dados para continuar para o pagamento.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nome" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
                  <Input label="Email" type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} required />
                  <Input label="Cpf/Cnpj" name="customerTaxId" value={formData.customerTaxId} onChange={handleInputChange} required />
                  <Input label="Telefone" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} required />
                </div>

                <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg">
                  Continuar para pagamento
                </button>
              </form>
            ) : (
              <div className="mt-6 space-y-6">
                <p className="text-gray-300">Escolha como deseja pagar.</p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`rounded-xl border py-3 font-semibold transition-colors ${
                      paymentMethod === "pix"
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "bg-black/30 text-white border-dark-700 hover:border-yellow-400"
                    }`}
                  >
                    Pix
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cartao")}
                    className={`rounded-xl border py-3 font-semibold transition-colors ${
                      paymentMethod === "cartao"
                        ? "bg-yellow-400 text-black border-yellow-400"
                        : "bg-black/30 text-white border-dark-700 hover:border-yellow-400"
                    }`}
                  >
                    Crédito
                  </button>
                </div>

                {paymentMethod === "cartao" && (
                  <div className="rounded-xl border border-dark-700 bg-black/20 p-4 space-y-4">
                    <h3 className="text-yellow-400 font-semibold">Pagamento com cartão</h3>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="sm:w-1/3 bg-transparent border border-dark-700 hover:border-yellow-400 text-white font-bold py-3 rounded-lg"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handlePayNow}
                    disabled={isLoading}
                    className="sm:w-2/3 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg"
                  >
                    {isLoading ? "Processando..." : "Pagar agora"}
                  </button>
                </div>
              </div>
            )}
          </section>

          <aside className="bg-dark-800 border border-dark-700 rounded-2xl p-6 h-fit space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Resumo do pedido</h2>
              <p className="text-yellow-400 font-bold">{selectedPlan.label}</p>
              <p className="text-gray-300 text-sm">{selectedPlan.description}</p>
            </div>

            <div className="border-t border-dark-700 pt-4 space-y-2">
              <p className="flex justify-between text-gray-300">
                <span>Ciclo:</span>
                <span className="capitalize">{billingCycle}</span>
              </p>
              <p className="flex justify-between text-white font-semibold text-lg">
                <span>Total:</span>
                <span>{formatCurrency(amountInCents)}</span>
              </p>
              <p className="flex justify-between text-gray-300">
                <span>Método:</span>
                <span>{paymentMethod === "pix" ? "Pix" : "Cartão"}</span>
              </p>
            </div>
            <div className="border-t border-dark-700 pt-4">
              <p className="text-xs text-gray-400">
                Os dados do checkout são enviados de forma automática para a API de pagamentos.
              </p>
            </div>

            <Link to="/planos" className="inline-block text-yellow-400 hover:text-yellow-300 text-sm">
              Escolher outro plano
            </Link>
          </aside>
        </div>
      </div>

      {showPixModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-dark-800 border border-dark-700 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-dark-700 flex items-center justify-between">
              <h3 className="text-xl font-bold">Pagamento com Pix</h3>
              <button onClick={handleClosePixModal} className="text-gray-400 hover:text-white text-2xl leading-none">
                ×
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="mx-auto w-72 h-72 bg-white rounded-lg flex items-center justify-center p-3">
                {pixData.qrCode ? (
                  <img src={pixData.qrCode} alt="QR Code Pix" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full rounded bg-[linear-gradient(90deg,#000_10%,#fff_10%,#fff_20%,#000_20%,#000_30%,#fff_30%,#fff_40%,#000_40%,#000_50%,#fff_50%,#fff_60%,#000_60%,#000_70%,#fff_70%,#fff_80%,#000_80%,#000_90%,#fff_90%)] bg-[length:18px_18px]" />
                )}
              </div>

              <p className="text-center text-gray-300">
                Aponte a câmera do app do seu banco para o QR Code ou copie o código abaixo.
              </p>

              <div className="rounded-lg border border-dark-700 bg-black/40 p-3">
                <p className="text-xs break-all text-gray-200">{pixData.pixCode || "Código Pix não retornado"}</p>
              </div>

              <button onClick={handleCopyPix} className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-lg">
                Copiar Pix copia e cola
              </button>

              {pixData.expiresAt && (
                <p className="text-xs text-gray-400 text-center">
                  Expira em: {new Date(pixData.expiresAt).toLocaleString("pt-BR")}
                </p>
              )}

              {pixPollStatus === "checking" && (
                <p className="text-xs text-gray-400 text-center animate-pulse">
                  Aguardando confirmação do pagamento...
                </p>
              )}

              <button
                onClick={handleClosePixModal}
                className="w-full bg-transparent border border-dark-700 hover:border-yellow-400 text-white font-bold py-3 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({ step }) {
  return (
    <div className="mt-4 text-sm text-gray-300 flex items-center gap-2">
      <span className={step === 1 ? "text-yellow-400 font-semibold" : ""}>Informações</span>
      <span>→</span>
      <span className={step === 2 ? "text-yellow-400 font-semibold" : ""}>Pagamento</span>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg bg-dark-900 border border-dark-700 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

export default Checkout;
