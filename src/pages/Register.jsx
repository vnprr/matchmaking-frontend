import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../config/config";
const REGISTER_API_URL = `${API_URL}/api/auth/register`;

export default function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required(t("usernameRequired", { defaultValue: "Nazwa użytkownika jest wymagana" })),
        email: yup
            .string()
            .email(t("emailInvalid", { defaultValue: "Niepoprawny e-mail" }))
            .required(t("emailRequired", { defaultValue: "E-mail jest wymagany" })),
        password: yup
            .string()
            .min(6, t("passwordMinLength", { defaultValue: "Hasło musi mieć co najmniej 6 znaków" }))
            .required(t("passwordRequired", { defaultValue: "Hasło jest wymagane" })),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegisterSubmit = async (data) => {
        try {
            await axios.post(REGISTER_API_URL, data);
            alert(t("registerSuccess", { defaultValue: "Rejestracja udana! Możesz się zalogować." }));
            navigate("/login");
        } catch {
            alert(t("registerFailure", { defaultValue: "Rejestracja nie powiodła się" }));
        }
    };

    const renderInputField = (labelKey, fieldName, type = "text") => (
        <div className="mb-3">
            <label>{t(labelKey, { defaultValue: labelKey })}</label>
            <input type={type} {...register(fieldName)} className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors[fieldName]?.message}</p>
        </div>
    );

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4">{t("registerTitle", { defaultValue: "Rejestracja" })}</h2>
                <form onSubmit={handleSubmit(handleRegisterSubmit)}>
                    {renderInputField("username", "username")}
                    {renderInputField("email", "email", "email")}
                    {renderInputField("password", "password", "password")}
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                        {t("registerButton", { defaultValue: "Zarejestruj się" })}
                    </button>
                </form>
            </div>
        </div>
    );
}