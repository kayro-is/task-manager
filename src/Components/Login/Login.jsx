// src/components/Login.js
import  { useState } from 'react';
import './Login.scss'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Connexion avec', { email, password });
      // Envoyer les données au backend
    };
  
    return (
      <div className="login-page-container">
        {/* Section Logo */}
        <div className="logo-container">
          <img src="/Task.png" alt="Task Manager Logo" />
          <p>&quot;Simplifiez votre quotidien, une tâche à la fois.&quot;</p>
        </div>

        <div className="separator"></div>
  
        {/* Formulaire de connexion */}
        <div className="login-container">
          <h2>Bienvenue</h2>
          <p>Connectez-vous à votre compte pour continuer</p>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Se connecter</button>
          </form>
          <p>
            <a href="/forgotpassword">Mot de passe oublié ?</a>
          </p>
          <p>
            Je n&apos;ai pas de compte ? <a href="/signup">S&apos;inscrire</a>
          </p>
        </div>
      </div>
    );
  }
  
  export default Login;