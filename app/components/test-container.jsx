export function TestContainer() {
    const start = {
      backgroundColor: "var(--bg-blue)",
      color: "var(--white)",
      padding: "2.5rem 1.25rem",
    };
  
    return (
      <section style={start}>
        <h5>Gör vårt test för att hitta din perfekta match</h5>
        <p>Har du svårt att hitta det perfekta företaget du vill jobba eller praktisera på? Prova då vårat test som matchar ihop dig med det du söker!</p>
        <button>Gör testet här</button>
      </section>
    );
  }