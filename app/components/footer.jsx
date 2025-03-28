export function Footer() {
    const style = {
      backgroundColor: "var(--bg-white)",
    };
  
    return (
      <footer style={style}>
        <ul>
            <li>Kontakt</li>
            <li>Integritetspolicy</li>
            <li>För företag</li>
            <li>För studenter</li>
        </ul>
        <ul>
            <li>Nyheter</li>
            <li>Om Yrgo</li>
            <li>Frågor och svar</li>
        </ul>
        <p>&copy; Yrgo, högre yrkesutbildning Göteborg</p>
      </footer>
    );
  }