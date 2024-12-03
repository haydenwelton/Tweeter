import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoHook";
import {
    RegisterPresenter,
    RegisterView,
} from "../../../presenter/RegisterPresenter";
import { User, AuthToken } from "tweeter-shared";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [alias, setAlias] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
    const [imageUrl, setImageUrl] = useState<string>("");

    const rememberMeRef = useRef(rememberMe);
    rememberMeRef.current = rememberMe;

    const navigate = useNavigate();
    const { updateUserInfo } = useUserInfo();
    const { displayErrorMessage } = useToastListener();

    const checkSubmitButtonStatus = (): boolean => {
        return !firstName || !lastName || !alias || !password || !imageUrl;
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        presenter.handleImageFile(file);
    };

    const doRegister = async () => {
        presenter.doRegister(firstName, lastName, alias, password, imageBytes);
    };

    const listener: RegisterView = {
        displayErrorMessage: displayErrorMessage,
        authenticated: (user: User, authToken: AuthToken) =>
            updateUserInfo(user, user, authToken, rememberMe),
        navigateTo: (url: string) => navigate(url),
        setImageUrl: (url: string) => setImageUrl(url),
        setImageBytes: (bytes: Uint8Array) => setImageBytes(bytes),
    };

    //might not need useState but have it just in case
    const [presenter] = useState(new RegisterPresenter(listener));

    const inputFieldGenerator = () => {
        return (
            <>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="firstNameInput"
                        placeholder="First Name"
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="firstNameInput">First Name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        size={50}
                        id="lastNameInput"
                        placeholder="Last Name"
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last Name</label>
                </div>
                <AuthenticationFields
                    setAlias={setAlias}
                    setPassword={setPassword}
                />
                <div className="form-floating mb-3">
                    <input
                        type="file"
                        className="d-inline-block py-5 px-4 form-control bottom"
                        id="imageFileInput"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="imageFileInput">User Image</label>
                    <img src={imageUrl} className="img-thumbnail" alt=""></img>
                </div>
            </>
        );
    };

    const switchAuthenticationMethodGenerator = () => {
        return (
            <div className="mb-3">
                Algready registered? <Link to="/login">Sign in</Link>
            </div>
        );
    };

    return (
        <AuthenticationFormLayout
            headingText="Please Register"
            submitButtonLabel="Register"
            oAuthHeading="Register with:"
            inputFieldGenerator={inputFieldGenerator}
            switchAuthenticationMethodGenerator={
                switchAuthenticationMethodGenerator
            }
            setRememberMe={setRememberMe}
            submitButtonDisabled={checkSubmitButtonStatus}
            submit={doRegister}
        />
    );
};

export default Register;
