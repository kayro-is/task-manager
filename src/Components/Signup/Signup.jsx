// src/components/Signup.js
import { useState } from 'react';
import './Signup.scss'; // On va ajouter du CSS spécifique pour cette page



function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('les mots depasse ne correspondent pas');

      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        methode: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData =  await response.json();
        setErrorMessage(errorData.message || ' erreur lors de l\'inscription');

        return;
      }

      setSuccessMessage('Inscription réussie ! Vous pouvez vous connecter.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    }catch (error) {
      setErrorMessage('Erreur lors de l\'inscription');
      console.error('Erreur dans le handleSubmit de Signup', error);
    }
  }


  return (
    <div className="signup-page-container">
      <div className="logo-signup-container">
        <img src="/Task.png" alt="Task Manager Logo" />
        <p>&quot;Simplifiez votre quotidien, une tâche à la fois.&quot;</p>
      </div>
      <div className="separator"></div>

      <div className="signup-form-container">
        <h2>Hello, Créez votre compte</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
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