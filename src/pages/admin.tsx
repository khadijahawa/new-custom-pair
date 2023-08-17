import { useContext, useState } from "react";
import { FirebaseContext } from "../../firebaseContext";

const AdminPage: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in
      })
      .catch((error) => {
        // Handle sign-in error
      });
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
