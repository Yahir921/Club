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
            <h3>Informes / WhatsApp</h3>
            <div className="phone-list">
              <a className="phone-card" href="tel:+525527561310" aria-label="Llamar al 55 2756 1310">
                <span className="phone-label">Telefono 1</span>
                <strong className="phone-number">55 2756 1310</strong>
                <span className="phone-action">Llamar ahora</span>
              </a>
              <a className="phone-card" href="tel:+525545819295" aria-label="Llamar al 55 4581 9295">
                <span className="phone-label">Telefono 2</span>
                <strong className="phone-number">55 4581 9295</strong>
                <span className="phone-action">Llamar ahora</span>
              </a>
            </div>
          </article>

          <article className="info-block">
            <h3>Email</h3>
            <ul className="info-list">
              <li>tolucacuautitlancdc@gmail.com</li>
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
                <a
                  href="https://www.facebook.com/share/1CYizJhKdz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook: Cuna de campeones.
                </a>
              </p>
              <p className="social-item social-item-instagram">
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" />
                  </svg>
                </span>
                <a
                  href="https://www.instagram.com/cuna_de_campeones_oficial?igsh=d3FmMTNqdXVlY3E3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: cuna_de_campeones_oficial.
                </a>
              </p>
              <p className="social-item">
                <span className="social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M12 2C6.48 2 2 6.5 2 12.04c0 4.99 3.66 9.13 8.44 9.96v-7.05H7.9v-2.9h2.54V9.9c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.46h-1.26c-1.25 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.83 8.44-4.97 8.44-9.96C22 6.5 17.52 2 12 2Z" />
                  </svg>
                </span>
                <a
                  href="https://www.facebook.com/share/19yKbTarYy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook: Centro de formacion de futbol Cuna de campeones.
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default ContactView
