import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

function Home() {
  return (
    <div className='container'>
      <header>
        <div class="logo">
          <img src="logo.png" alt="Logo do Laboratório" />
          <h1>Laboratório de Exames</h1>
        </div>
        <Link to={'/login'}><button class="login-button">Login</button></Link>
      </header>

      <main>
        <section class="exams-section">
          <h2>Exames Disponíveis</h2>
        </section>

        <section class="results-section">
          <h2>Resultados de Exames</h2>
        </section>
      </main>

      <footer>
        <p>Todos os direitos reservados &copy; Laboratório de Exames</p>
      </footer>
    </div>
  )
}

export default Home