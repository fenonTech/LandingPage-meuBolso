export default function OpenFinance() {
  return (
    <section
      id="openfinance"
      className="bg-black min-h-screen relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-8 sm:py-20">
          {/* Open Finance Badge */}
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm mb-8">
            Open Finance
          </div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-4xl px-4">
            O Open Finance
            <br />
            <span className="text-yellow-400">é seu</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 mb-12 leading-relaxed max-w-3xl px-4">
            O Meu bolso se conecta diretamente aos seus bancos via Open Finance.
            Sem
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="sm:hidden"> </span>
            necessidade de enviar extratos manualmente, suas transações chegam
            <span className="hidden sm:inline">
              <br />
            </span>
            <span className="sm:hidden"> </span>
            automaticamente até você de forma segura e instantânea.
          </p>

          {/* Open Finance Image */}
          <div className="flex justify-center">
            <img
              src={
                "https://fenon-meubolso.s3.us-east-1.amazonaws.com/landingpage/imgs/openFinance.png"
              }
              alt="Open Finance Connections"
              className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
