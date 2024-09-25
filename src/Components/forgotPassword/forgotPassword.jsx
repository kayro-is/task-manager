import { useState } from 'react';
import './forgotPassword.scss';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [ message,setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            setMessage(' un message de rénisialisation a été envoyer a votre adresse email' )
        }, 1000)
    };

    return(

<div className="forgot-password-container">
          <div className="logo-container">
          <img src="/Task.png" alt="Task Manager Logo" />
          <p>&quot;Simplifiez votre quotidien, une tâche à la fois.&quot;</p>
        </div>

        
        <div className="separator"></div>

        <div className="forgot-password-form-container">

    <h2>Réinitialisez votre mot de passe</h2>
    <p>Veuillez entrer votre adresse email pour recevoir un lien de réinitialisation.</p>

    {message && <p className="message">{message}</p>}

    <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
        type="email"
        placeholder="Entrez votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <button type="submit">Envoyer</button>
    </form>
</div>
</div>


    )
}

export default ForgotPassword;