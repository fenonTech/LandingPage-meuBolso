import { useMemo, useState } from "react";
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
  const [pixData, setPixData] = useState({ qrCode: "", pixCode: "" });
  const [apiResponse, setApiResponse] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerTaxId: "",
    customerPhone: "",
    returnUrl: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpiryMonth: "",
    cardExpiryYear: "",
    cardCvv: "",
  });

  const pagamentoBaseBody = useMemo(
    () => ({
      nome_produto: selectedPlan.label,
      descricao: `${selectedPlan.description} (${billingCycle})`,
      quantidade: 1,
      valor_centavos: amountInCents,
      nome: formData.customerName,
      email: formData.customerEmail,
      celular: formData.customerPhone,
      cpf_cnpj: formData.customerTaxId,
      retorno_url: formData.returnUrl || window.location.href,
    }),
    [amountInCents, billingCycle, formData, selectedPlan]
  );

  const checkoutPayloadPreview = useMemo(
    () => ({
      metodo_pagamento: paymentMethod,
      ...pagamentoBaseBody,
    }),
    [pagamentoBaseBody, paymentMethod]
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

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!validateStep1()) {
      return;
    }
    setStep(2);
  };

  const getPixValues = (responseData) => {
    const qrCode =
      responseData?.qr_code ||
      responseData?.qrCode ||
      responseData?.data?.qr_code ||
      responseData?.data?.qrCode ||
      "";

    const pixCode =
      responseData?.pix_copia_cola ||
      responseData?.pixCopiaCola ||
      responseData?.pix_code ||
      responseData?.data?.pix_copia_cola ||
      responseData?.data?.pixCode ||
      "";

    return { qrCode, pixCode };
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

    const endpoint = paymentMethod === "pix" ? "/api/pagamentos/pix" : "/api/pagamentos/cartao";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pagamentoBaseBody),
      });

      const data = await response.json().catch(() => ({}));
      setApiResponse(data);

      if (!response.ok) {
        const message = data?.message || data?.erro || "Não foi possível criar o pagamento.";
        throw new Error(message);
      }

      if (paymentMethod === "pix") {
        const parsedPix = getPixValues(data);

        if (!parsedPix.qrCode && !parsedPix.pixCode) {
          throw new Error("A API não retornou qr_code ou pix_copia_cola.");
        }

        setPixData(parsedPix);
        setShowPixModal(true);
        return;
      }

      const redirectUrl = getCardRedirect(data);

      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
      } else {
        alert("Pagamento com cartão criado com sucesso!");
      }
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

                {paymentMethod === "pix" && (
                  <div className="rounded-xl border border-dark-700 bg-black/20 p-4">
                    <p className="text-gray-200 text-lg font-medium mb-2">Escolha Pix para pagar.</p>
                    <p className="text-gray-400 text-sm">
                      Ao clicar em pagar, vamos gerar o qr_code e o pix_copia_cola pela API.
                    </p>
                  </div>
                )}

                {paymentMethod === "cartao" && (
                  <div className="rounded-xl border border-dark-700 bg-black/20 p-4 space-y-4">
                    <h3 className="text-yellow-400 font-semibold">Tela de cartão</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Nome no cartão" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} />
                      <Input label="Número do cartão" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} />
                      <Input label="Mês (MM)" name="cardExpiryMonth" value={formData.cardExpiryMonth} onChange={handleInputChange} />
                      <Input label="Ano (AAAA)" name="cardExpiryYear" value={formData.cardExpiryYear} onChange={handleInputChange} />
                      <Input label="CVV" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} />
                    </div>
                    <p className="text-xs text-gray-400">
                      Os dados enviados seguem exatamente o body documentado em <code>/api/pagamentos/cartao</code>.
                    </p>
                  </div>
                )}

                <div>
                  <Input
                    label="URL de retorno (opcional)"
                    name="returnUrl"
                    value={formData.returnUrl}
                    onChange={handleInputChange}
                    placeholder="https://seusite.com/obrigado"
                  />
                </div>

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
              <p className="text-xs text-gray-400 mb-2">Body enviado para API</p>
              <pre className="text-xs bg-black/40 rounded-lg p-3 overflow-auto max-h-72 border border-dark-700 text-gray-300">
                {JSON.stringify(checkoutPayloadPreview, null, 2)}
              </pre>
            </div>

            {apiResponse && (
              <div className="border-t border-dark-700 pt-4">
                <p className="text-xs text-gray-400 mb-2">Última resposta da API</p>
                <pre className="text-xs bg-black/40 rounded-lg p-3 overflow-auto max-h-72 border border-dark-700 text-gray-300">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}

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
              <button onClick={() => setShowPixModal(false)} className="text-gray-400 hover:text-white text-2xl leading-none">
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

              <button
                onClick={() => setShowPixModal(false)}
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
