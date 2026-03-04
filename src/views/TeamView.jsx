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
            <h3>Metodologia (6 a 14 años)</h3>
            <ul className="info-list">
              <li>Familiarizacion (6 a 8): capacidades fisicas y desarrollo motor.</li>
              <li>Iniciacion (9 a 11): control corporal y tecnica basica.</li>
              <li>Desarrollo (12 a 14): fundamentos ofensivos y defensivos.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Metodologia (15 a 35 años)</h3>
            <ul className="info-list">
              <li>Aplicacion (15 a 16): ubicacion y aplicacion de sistemas de juego.</li>
              <li>Ejecucion (17 a 19): deteccion y adaptacion al futbol profesional.</li>
              <li>Todas las anteriores (20 a 35): disciplina y constancia competitiva.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Horarios</h3>
            <ul className="info-list">
              <li>Cuautitlan: martes y jueves de 16:30 a 18:30 hrs.</li>
              <li>Jaltenco: lunes a jueves de 16:00 a 18:30 hrs.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Categorias y formacion</h3>
            <ul className="info-list">
              <li>Categorias desde los 6 años hasta los 20 años de edad.</li>
              <li>Formacion deportiva y humana con identidad, respeto y disciplina.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Estructura deportiva</h3>
            <ul className="info-list">
              <li>Director General: D.T. Victor Miguel Salinas A.</li>
              <li>Director Deportivo: D.T. R. Gamaliel Mendoza C.</li>
              <li>Equipo con profesores, psicologos, promotores y asesores.</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Ventajas</h3>
            <ul className="info-list">
              <li>Escuela filial certificada en la zona de Cuautitlan.</li>
              <li>Profesores capacitados y programas integrales de desarrollo.</li>
              <li>Seguimiento academico y visorias semestrales.</li>
              <li>Instalaciones en mantenimiento y costos accesibles.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}

export default TeamView;
