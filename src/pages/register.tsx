import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import RegistrationForm, { type UserRole } from "~/components/RegistrationForm";
import { type RegistrationFormData } from "~/components/RegistrationForm";
import { type SubmitHandler } from "react-hook-form";

const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const router = useRouter();
  const registerMutation = api.user.register.useMutation({
    onSuccess: async () => {
      await router.push("/profile");
    },
  });
  const { data: session } = useSession();

  const handleFormSubmit: SubmitHandler<RegistrationFormData> = async (
    data: RegistrationFormData,
  ) => {
    if (!session) {
      setError("You must be logged in to save data");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        ...data,
        ...(!!data.dob && { dob: new Date(data.dob) }),
      });
    } catch (error) {
      console.error(error);
      setError("Error saving user data");
    }
  };

  return (
    <div className="h-screen w-screen ">
      {role != "" ? (
        <RegistrationForm onSubmit={handleFormSubmit} role={role} />
      ) : (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
          <div>I am a</div>
          <div className="flex gap-10">
            <button onClick={() => setRole("student")}>Student</button>
            <button onClick={() => setRole("company")}>Employer</button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Register;
