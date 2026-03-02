function ContactView() {
  return (
    <main>
      <section className="section">
        <div className="section-head">
          <p className="section-tag">Contacto</p>
          <h2>Informacion de contacto</h2>
        </div>
        <div className="info-grid">
          <article className="info-block">
            <h3>WhatsApp</h3>
            <ul className="info-list">
              <li>5527561310</li>
              <li>5545819295</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Email</h3>
            <ul className="info-list">
              <li>contacto@redtoluca.com</li>
            </ul>
          </article>

          <article className="info-block">
            <h3>Redes sociales</h3>
            <div className="social-list">
              <p className="social-item">
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M12 2C6.48 2 2 6.5 2 12.04c0 4.99 3.66 9.13 8.44 9.96v-7.05H7.9v-2.9h2.54V9.9c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.46h-1.26c-1.25 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.83 8.44-4.97 8.44-9.96C22 6.5 17.52 2 12 2Z" />
                  </svg>
                </span>
                <span>Facebook: Cuna de campeones.</span>
              </p>
              <p className="social-item">
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M12 7.1A4.9 4.9 0 1 0 12 17a4.9 4.9 0 0 0 0-9.8Zm0 8a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6.2-8.45a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0ZM20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm1.6 0c0 5.3-4.3 9.6-9.6 9.6S2.4 17.3 2.4 12 6.7 2.4 12 2.4s9.6 4.3 9.6 9.6Z" />
                  </svg>
                </span>
                <span>Instagram: cuna_de_campeones_oficial.</span>
              </p>
              <p className="social-item">
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M12 2C6.48 2 2 6.5 2 12.04c0 4.99 3.66 9.13 8.44 9.96v-7.05H7.9v-2.9h2.54V9.9c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.46h-1.26c-1.25 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.83 8.44-4.97 8.44-9.96C22 6.5 17.52 2 12 2Z" />
                  </svg>
                </span>
                <span>Facebook: Centro de formacion de futbol Cuna de campeones.</span>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default ContactView
