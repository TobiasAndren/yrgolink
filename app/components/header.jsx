export function HeaderStart() {
  const start = {
    backgroundColor: "var(--bg-red)",
    color: "white",
  };

  return (
    <header style={start}>
      <h1>Välkommen till YrgoLink</h1>
      <p>Hitta din nästa LIA eller framtida kollega</p>
    </header>
  );
}