import React, { useState } from "react";
import "./RegisterScreen.css";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ReactLoading from "react-loading";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAuth } from "../../firebase";
import { H1, Wrapper, WrapperFields } from "./styles";
import Topic from "../../components/Topic";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PrimaryButton from "../../components/PrimaryButton";

const RegisterScreen = () => {
  const [user, setUser] = useState({
    email: "",
    name: "",
    contact: "",
    type: "",
    password: "",
    description: "",
    imgSrc: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const { signUp } = useAuth();

  const handleSignup = () => {
    setIsLoading(true);
    clearErrors();
    const { name, contact, typeOfUser, email, password } = user;
    signUp(user).then((data) => {
      switch (data) {
        case "auth/email-already-in-use":
          setEmailError(data);
          setIsLoading(false);
        case "auth/invalid-email":
          setEmailError(data);
          setIsLoading(false);
          break;
        case "auth/weak-password":
          setPasswordError(data);
          setIsLoading(false);
          break;
        default:
          setShouldRedirectToLogin(true);
          break;
      }
    });
  };

  if (shouldRedirectToLogin) {
    return <Redirect push to="/" />;
  }

  return (
    <Wrapper>
      <H1>Cadastrar perfil</H1>
      <Topic name="Informações básicas">
        <WrapperFields>
          <TextField
            id="nome-basic"
            label="Nome"
            variant="outlined"
            fullWidth
            name="name"
            type="text"
            value={user.name}
            onChange={handleChange}
          />

          <TextField
            required
            fullWidth
            label="Email"
            id="email-required"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <p>{emailError}</p>
          </FormControl>

          <TextField
            required
            fullWidth
            label="Contato"
            id="outlined-required"
            name="contact"
            type="text"
            value={user.contact}
            onChange={handleChange}
          />

          <FormControl variant="standard" fullWidth>
            <InputLabel id="select-label" label>
              Você é segurança ou lojista?
            </InputLabel>
            <Select
              id="select"
              name="type"
              type="text"
              value={user.type}
              onChange={handleChange}
            >
              <MenuItem value={"guard"}>Segurança</MenuItem>
              <MenuItem value={"shopman"}>Lojista</MenuItem>
            </Select>
          </FormControl>
        </WrapperFields>
      </Topic>

      <Topic name="Perfil">
        <WrapperFields>
          <TextField
            id="foto"
            label="Foto"
            variant="outlined"
            fullWidth
            name="imgSrc"
            type="text"
            value={user.imgSrc}
            onChange={handleChange}
          />
          <TextField
            id="descricao"
            label="Descricao"
            variant="outlined"
            fullWidth
            name="description"
            type="text"
            value={user.description}
            onChange={handleChange}
          />
        </WrapperFields>
      </Topic>

      <Topic name="Validacao de documentos">
        <WrapperFields>
          <TextField
            id="foto"
            label="Documentos"
            variant="outlined"
            fullWidth
            name="docs"
            type="text"
            value={user.docs}
            onChange={handleChange}
          />
        </WrapperFields>
      </Topic>
      {isLoading ? (
        <ReactLoading
          className="loading-login-screen-style"
          type="bars"
          color="#09629E"
          height={"20%"}
          width={"20%"}
        />
      ) : (
        <PrimaryButton onClick={handleSignup} className="create-account-button">
          Cadastrar
        </PrimaryButton>
      )}
    </Wrapper>
  );
};

export default RegisterScreen;
