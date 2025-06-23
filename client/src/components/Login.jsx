import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase.js";
function Login() {
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();

            console.log("Kullanıcı email:", user.email);
            console.log("idToken:", idToken);
            const allowedEmails = import.meta.env.VITE_FIREBASE_ALLOWED_EMAIL ? import.meta.env.VITE_FIREBASE_ALLOWED_EMAIL.split(",") : [];

            if (allowedEmails.includes(user.email)) {
                window.location.href = "/dashboard";
            } else {
                alert("Bu mail adresi yetkili değil.");
            }
        } catch (err) {
            console.error("Giriş hatası:", err);
            alert("Giriş sırasında hata oluştu.");
        }
    };
    return (
        <button onClick={handleLogin} className="text-sm lg:text-base bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition-all duration-200 cursor-pointer">
            Yönetici Girişi
        </button>
    )
}

export default Login