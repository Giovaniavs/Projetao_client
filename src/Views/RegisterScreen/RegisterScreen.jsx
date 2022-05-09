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
  ButtonWrapper,
  Disclaimer,
  DisclaimerLink,
  H1,
  Input,
  InputWrapper,
  InvisbleInput,
  Label,
  ModalBody,
  Wrapper,
  WrapperFields,
} from "./styles";
import Topic from "../../components/Topic";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PrimaryButton from "../../components/PrimaryButton";
import backIcon from "./back-icon.png";
import UploadComponent from "./UploadComponent";
import TermsModal from "./TermsModal";

const RegisterScreen = () => {
  const { uploadFile } = useStorage();
  const [user, setUser] = useState({
    email: "",
    name: "",
    contact: "",
    type: "shopman",
    password: "",
    description: "",
    imgSrc: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [shouldRedirectToLogin, setShouldRedirectToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [perfilPic, setPerfilPic] = useState([]);
  const [carteiradeIdentidade, setCarteiradeIdentidade] = useState([]);
  const [comprovanteResidencia, setComprovanteResidencia] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [cnv, setCnv] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefuseTerm = () => {
    window.location.replace("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const { signUp, createUser } = useAuth();

  const handleSignup = (event) => {
    const images = {
      certifications,
      perfilPic,
      carteiradeIdentidade,
      comprovanteResidencia,
      cnv,
    };
    event.preventDefault();
    setIsLoading(true);
    clearErrors();
    signUp({ user, images, setShouldRedirectToLogin, setIsLoading }, (user) => {
      createUser({ user, images }, (createdUser) =>
        console.log("User created :))")
      );
    })
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

  const isGuard = user.type == "guard";

  return (
    <>
      <Wrapper onSubmit={handleSignup} id="sign_up_form">
        <div className="register-back-icon-style">
          <img
            src={backIcon}
            alt=""
            onClick={() => setShouldRedirectToLogin(true)}
          />
        </div>
        <H1>Cadastrar perfil</H1>

        <Topic name="Informações básicas">
          <WrapperFields>
            <TextField
              id="nome-basic"
              label="Nome"
              variant="outlined"
              fullWidth
              name="name"
              autoComplete="name"
              required
              type="text"
              value={user.name}
              onChange={handleInputChange}
            />

            <TextField
              required
              fullWidth
              label="Email"
              id="email-"
              name="email"
              autoComplete="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
            />

            <FormControl fullWidth variant="outlined" required>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="password"
                value={user.password}
                onChange={handleInputChange}
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
              autoComplete="contact"
              id="outlined-"
              name="contact"
              type="text"
              value={user.contact}
              onChange={handleInputChange}
            />

            <FormControl variant="standard" fullWidth required>
              <InputLabel id="select-label">
                Você é segurança ou lojista?
              </InputLabel>
              <Select
                id="select"
                name="type"
                autoComplete="type"
                type="text"
                value={user.type}
                onChange={handleInputChange}
              >
                <MenuItem value={"guard"}>Segurança</MenuItem>
                <MenuItem value={"shopman"}>Lojista</MenuItem>
              </Select>
            </FormControl>
          </WrapperFields>
        </Topic>

        <Topic name="Documentos">
          <WrapperFields>
            <Disclaimer>
              <Alert severity="warning">
                Ao enviar os documentos, você concorda com os{" "}
                <DisclaimerLink href="#" onClick={handleClickOpen}>
                  termos de uso
                </DisclaimerLink>
              </Alert>
            </Disclaimer>
            <InputWrapper>
              <Label id="idCard">
                Selecionar Carteira de Identidade frente e verso (png/jpge)
              </Label>
              <UploadComponent
                setImagesList={setCarteiradeIdentidade}
                imageList={carteiradeIdentidade}
                imageName="cateira de identidade"
                limiteUpload={2}
                buttonTitle="Enviar foto RG"
                required
              />
            </InputWrapper>

            <InputWrapper>
              <Label id="residenceDoc">
                Selecionar Comprovante de Residência (png/jpge)
              </Label>
              <UploadComponent
                setImagesList={setComprovanteResidencia}
                imageList={comprovanteResidencia}
                imageName="comprovante de residencia"
                limiteUpload={1}
                buttonTitle="Enviar foto Comprovante de Residencia"
              />
            </InputWrapper>
          </WrapperFields>
        </Topic>

        {isGuard && (
          <>
            <Topic name="Carteira Nacional do Vigilante">
              <WrapperFields>
                <Label id="imgSrc">
                  Selecionar Carteira Nacional do Vigilante(png/jpge)
                </Label>

                <UploadComponent
                  setImagesList={setCnv}
                  imageList={cnv}
                  imageName="cnv"
                  limiteUpload={1}
                  buttonTitle="Selecionar carteira do Vigilante"
                />
              </WrapperFields>
            </Topic>
            <Topic name="Perfil">
              <WrapperFields>
                <Label id="imgSrc">Selecionar Foto de Perfil (png/jpge)</Label>

                <UploadComponent
                  setImagesList={setPerfilPic}
                  imageList={perfilPic}
                  imageName="perfil"
                  limiteUpload={1}
                  buttonTitle="Enviar foto de perfil"
                />

                <TextField
                  required
                  id="descricao"
                  autoComplete="description"
                  label="Descricao"
                  variant="outlined"
                  fullWidth
                  name="description"
                  type="text"
                  value={user.description}
                  onChange={handleInputChange}
                />
              </WrapperFields>
            </Topic>
            <Topic name="Certificações">
              <WrapperFields>
                <InputWrapper>
                  <Label id="certificados">
                    Selecionar certificados (png/jpge)
                  </Label>
                  <UploadComponent
                    setImagesList={setCertifications}
                    imageList={certifications}
                    imageName="certificacao"
                    limiteUpload={10}
                    buttonTitle="Enviar foto das certificações"
                  />
                </InputWrapper>
              </WrapperFields>
            </Topic>
          </>
        )}

        {isLoading ? (
          <ReactLoading
            className="loading-login-screen-style"
            type="bars"
            color="#09629E"
            height={"20%"}
            width={"20%"}
          />
        ) : (
          <PrimaryButton type="submit" className="create-account-button">
            Criar conta
          </PrimaryButton>
        )}

        <TermsModal
          handleClose={handleClose}
          open={open}
          handleRefuseTerm={handleRefuseTerm}
        />
      </Wrapper>
    </>
  );
};

export default RegisterScreen;
