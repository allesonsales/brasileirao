import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para indicar que ocorreu um erro.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Você pode usar esta função para logar erros em serviços de monitoramento como Sentry ou LogRocket
    console.error("Erro capturado:", error);
    console.info("Informações sobre o erro:", info);
    this.setState({ info });
  }

  handleReload = () => {
    // Método para recarregar a página ou o componente
    this.setState({ hasError: false, error: null, info: null });
    window.location.reload(); // Recarrega a página
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
          <h2>Algo deu errado!</h2>
          <p>{this.state.error?.message || "Erro desconhecido"}</p>
          <p>{this.state.info?.componentStack}</p>
          <button onClick={this.handleReload} style={{ padding: "10px", cursor: "pointer" }}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
