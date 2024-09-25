// src/components/Signup.js
import { useState } from 'react';
import './Signup.scss'; // On va ajouter du CSS spécifique pour cette page

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log('Inscription réussie', { email, password });
      // Envoyer les données au backend
    } else {
      console.log('Les mots de passe ne correspondent pas');
    }
  };

  return (
    <div className="signup-page-container">
      <div className="logo-signup-container">
        {/* Image ou logo fictif */}
        <img src="/Task.png" alt="Task Manager Logo" />
        <p>&quot;Simplifiez votre quotidien, une tâche à la fois.&quot;</p>
      </div>
      <div className="separator"></div>

      <div className="signup-form-container">
        <h2>Hello, Créez votre compte</h2>
        <form onSubmit={handleSubmit} className="signup-form">
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
          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">S&apos;inscrire</button>
        </form>
        <p>
          J&apos;ai déjà un compte ? <a href="/">Connexion</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
