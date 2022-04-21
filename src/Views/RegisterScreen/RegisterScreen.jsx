import React, { useState } from "react";
import "./RegisterScreen.css";
import { Redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";
import ReactLoading from "react-loading";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAuth, useStorage } from "../../firebase";
import {
  H1,
  Input,
  InputWrapper,
  Label,
  Wrapper,
  WrapperFields,
} from "./styles";
import Topic from "../../components/Topic";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PrimaryButton from "../../components/PrimaryButton";

const RegisterScreen = () => {
  const { uploadFile } = useStorage();
  const [user, setUser] = useState({
    email: "",
    name: "",
    contact: "",
    type: "",
    password: "",
    description: "",
    imgSrc: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [images, setImages] = useState({
    idCard: null,
    imgSrc: null,
    residenceDoc: null,
    certifications: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    const { name } = e.target;
    const isCertification = name === "certifications";
    setImages((prev) => ({ ...prev, [name]: isCertification ? [] : null }));
    const reader = new FileReader();
    let files = isCertification
      ? Object.values(e.target.files)
      : e.target.files[0]; // get the supplied file
    // if there is a file, set image to that file
    if (files) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          uploadFile({ files, setImages, name, setIsLoading });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      // if there is no file, set image back to null
    }
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const { signUp } = useAuth();

  const handleSignup = (event) => {
    event.preventDefault();
    setIsLoading(true);
    clearErrors();
    signUp({ user, images, setShouldRedirectToLogin, setIsLoading })
      .then((data) => {
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
        setIsLoading(false);
      })
      .catch((error) => setIsLoading(false));
  };

  if (shouldRedirectToLogin) {
    return <Redirect push to="/" />;
  }

  const isDisabled = !(
    images.certifications.length &&
    images.idCard &&
    images.imgSrc &&
    images.residenceDoc
  );

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
              required
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
          <InputWrapper>
            <Label id="imgSrc">Selecionar Foto de Perfil</Label>
            <Input
              id="imgSrc"
              name="imgSrc"
              type="file"
              accept="image/x-png,image/jpeg"
              value={user.imgSrc}
              onChange={onImageChange}
              multiple
            />
          </InputWrapper>
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

      <Topic name="Documentos">
        <WrapperFields>
          <InputWrapper>
            <Label id="idCard">Selecionar Carteira de Identidade</Label>
            <Input
              id="idCard"
              name="idCard"
              type="file"
              accept="image/x-png,image/jpeg"
              value={user.idCard}
              onChange={onImageChange}
              multiple
            />
          </InputWrapper>

          <InputWrapper>
            <Label id="residenceDoc">
              Selecionar Comprovante de Residência
            </Label>
            <Input
              id="residenceDoc"
              name="residenceDoc"
              type="file"
              accept="image/x-png,image/jpeg"
              value={user.residenceDoc}
              onChange={onImageChange}
            />
          </InputWrapper>
        </WrapperFields>
      </Topic>

      <Topic name="Certificações">
        <WrapperFields>
          <InputWrapper>
            <Label id="certificados">Selecionar certificados</Label>
            <Input
              id="certificados"
              label="Selecionar certificacoes"
              name="certifications"
              type="file"
              accept="image/x-png,image/jpeg"
              value={user.certifications}
              onChange={onImageChange}
              multiple
            />
          </InputWrapper>
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
        <PrimaryButton
          type="submit"
          onClick={handleSignup}
          className="create-account-button"
          disabled={isDisabled}
        >
          {isDisabled ? "Por favor faça upload das documentos" : "Cadastrar"}
        </PrimaryButton>
      )}
    </Wrapper>
  );
};

export default RegisterScreen;
