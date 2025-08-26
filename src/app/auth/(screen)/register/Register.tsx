import Image from "next/image";
import SignUpForm from "./components/SignUpForm";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="rounded-xl flex flex-col justify-center w-[60%] xl:w-[50%] mx-2 max-w-6xl overflow-hidden p-4 sm:p-8">
                <div className="px-4 sm:py-4 text-center lg:text-left">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={180}
                        height={54}
                        className="mx-auto lg:mx-0"
                    />
                </div>
                <div className="flex flex-col items-center gap-1 py-5 rounded-xl shadow-[0px_0px_5px_3px_#f7fafc] shadow-[#FFFFFF08]">
                    <div>
                        <Image
                            src="/images/feature_icon.png"
                            alt="feature_icon"
                            width={75}
                            height={75}
                        />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-200">
                        Crear Cuenta
                    </h2>
                    <p className="text-gray-400 text-sm">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            href="/auth/login"
                            className="text-purple-400 hover:underline"
                        >
                            Ingresar
                        </Link>
                    </p>
                    <hr className="border-t border-[#FFFFFF08] w-full mt-8 mb-4" />
                    <div className="flex flex-col items-center w-[80%]">
                        <SignUpForm />
                    </div>
                </div>
            </div>

            <div className="relative hidden xl:block lg:w-[40%] h-[840px]">
                <Image
                    src="/images/bg-register.png"
                    alt="bg-register"
                    fill
                    className="rounded-xl object-cover"
                    sizes="(max-width: 1024px) 0vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 p-4 text-white z-10">
                    <p className="text-xl sm:text-2xl md:text-3xl max-w-2/3">
                        No es una red social. Es tu comunidad digital. Conecta y crea.
                        A tu ritmo, en tu espacio.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;