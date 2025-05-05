import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./EmailNewPassword.css";

function EmailNewPassword() {
    return (
        <>
            <Header />

            <main className="email-container">
                <div className="email-card">
                    <h2>Encontre sua conta</h2>
                    <p>Insira seu email para procurar sua conta.</p>
                    <form className="email-form">
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            required
                        />
                        <div className="buttons">
                            <button type="button" className="btn-cancelar">Cancelar</button>
                            <button type="submit" className="btn-procurar">Procurar</button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default EmailNewPassword;
