function TeamView() {
  return (
    <main>
      <section className="section info">
        <div className="section-head">
          <p className="section-tag">Informacion</p>
          <h2>Centro de Formacion de Futbol Toluca "Cuna de campeones"</h2>
        </div>

        <div className="info-grid">
          <article className="info-block">
            <h3>Torneos avalados por la FMF</h3>
            <ul className="info-list">
              <li>Locales, regionales, nacionales e inter redes.</li>
              <li>Torneos en estadios de 1a div. profesional.</li>
              <li>Ligas mas importantes de Edo. Mexico.</li>
              <li>Visorias oficiales y profesionales.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Cantera y entrenadores</h3>
            <ul className="info-list">
              <li>Cantera de jugadores en fuerzas basicas.</li>
              <li>Entrenadores capacitados y avalados por: SEP-CONADE-FMF.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Horarios</h3>
            <ul className="info-list">
              <li>Martes 4:30 PM a 18:30 PM.</li>
              <li>Jueves 4:30 a 18:30.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Formacion</h3>
            <ul className="info-list">
              <li>Formacion con valores en el futbol.</li>
              <li>Categorias a partir de los 6 anos de edad.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Direccion</h3>
            <ul className="info-list">
              <li><strong>Sede Camino a Santiago</strong></li>
              <li>CALLE: CAMINO A SANTIAGO S/N. COL. EJIDOS DE SAN MATEO.</li>
              <li>FRACC. SANTIAGO "CAMPOS MORLAN" CUATITLAN.</li>
              <li>ESTADO DE MEXICO.</li>
              <li><strong>Sede Canchas GEO</strong></li>
              <li>CANCHAS GEO, MZA 021 BAHIAS DE JALTENCO, ALBORADA JALTENGO.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

export default TeamView;
