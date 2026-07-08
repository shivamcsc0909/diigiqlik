import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function GoogleAuthButton() {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    // यहां Google Identity Services का token मिलेगा.
    // अभी placeholder flow दिया है.
    const fakeGooglePayload = {
      idToken: 'GOOGLE_ID_TOKEN_FROM_OAUTH',
    };

    const data = await api.googleLogin(fakeGooglePayload);
    login(data.user);
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleGoogleLogin}>
      Continue with Google
    </button>
  );
}