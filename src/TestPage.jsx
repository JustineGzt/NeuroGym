import React from 'react';

export default function TestPage() {
  return (
    <main className="page" id="top">
      <section className="section" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
        <article className="card" style={{ maxWidth: 640, textAlign: 'center' }}>
          <p className="kicker">Page de verification</p>
          <h1>Page test</h1>
          <p>
            Cette page sert d'espace de test pour verifier le routing, la navigation et l'affichage.
          </p>
          <p>
            URL: <strong>/test.html</strong>
          </p>
          <a className="btn btn-solid" href="/home.html">Retour a l'accueil</a>
        </article>
      </section>
    </main>
  );
}
