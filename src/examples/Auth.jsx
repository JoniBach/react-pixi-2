import { Repeat, Send } from "@styled-icons/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/interface/Button";
import { Input } from "../components/interface/Input";
import { Modal } from "../components/interface/Modal";
import { useUser } from "../contexts/UserContext";

export const Auth = () => {
  const history = useNavigate();
  const { signUp, signIn } = useUser();

  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const title = showLogin ? "login" : "sign up";
  const switchButton = `or ${showLogin ? "sign up" : "login"}`;

  const handleLogin = async (e) => {
    const user = {
      email,
      password,
      username,
    };
    signIn(user);
  };

  const handleRegister = async (e) => {
    const user = {
      email,
      password,
      username,
    };
    signUp(user);
  };

  const handleSubmit = (e) => (showLogin ? handleLogin(e) : handleRegister(e));

  return (
    <Modal title={title}>
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
      <Input
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex">
        <Button onClick={() => setShowLogin(!showLogin)}>
          <Repeat size={20} />
          {switchButton}
        </Button>
        <div className="w-full" />
        <Button onClick={() => handleSubmit()}>
          submit <Send size={20} />
        </Button>
      </div>
    </Modal>
  );
};
