import RegisterForm from "@/components/Form/RegisterForm";
import CoverGallery from "@/components/UI/CoverGallery";

const Register = () => {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className="w-3/4 flex flex-row md:grid md:grid-cols-2 md:gap-5 gap-0 md:min-h-[520px] justify-center">
        <div className="relative hidden md:flex shadow-lg border border-gray-300 rounded-sm">
          <CoverGallery />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
