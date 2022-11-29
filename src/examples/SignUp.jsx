import { Repeat, Send } from "@styled-icons/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/interface/Button";
import { Input } from "../components/interface/Input";
import { Modal } from "../components/interface/Modal";
import { useUser } from "../contexts/UserContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useUser();

  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const title = "sign up";

  const handleRegister = async (e) => {
    const user = {
      email,
      password,
      username,
    };
    const res = await signUp(user);
    alert(res?.message);

    if (res?.username) {
      navigate("/");
    }
    return user;
  };

  return (
    <Modal title={title}>
      <Input
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex">
        <Button onClick={() => navigate("/signin")}>
          <Repeat size={20} />
          or sign in
        </Button>
        <div className="w-full" />
        <Button onClick={() => handleRegister()}>
          submit <Send size={20} />
        </Button>
      </div>
    </Modal>
  );
};
