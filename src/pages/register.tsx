import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { type SubmitHandler } from "react-hook-form";
import { type UserRole } from "~/utils/types";
import UserRegistrationForm, {
  type UserRegistrationFormData,
} from "~/components/UserRegistrationForm";
import EmployerRegistrationForm, {
  type EmployerRegistrationFormData,
} from "~/components/EmployerRegistrationForm";

const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const router = useRouter();
  const userRegisterMutation = api.user.register.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
    onError(error) {
      setError(error.message);
    },
  });
  const employerRegistrationMutation = api.user.registerAsEmployer.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });
  const { data: session, status } = useSession();
  const handleCompanyFormSubmit: SubmitHandler<
    EmployerRegistrationFormData
  > = async (data: EmployerRegistrationFormData) => {
    employerRegistrationMutation.mutate(data);
  };
  const handleUserFormSubmit: SubmitHandler<UserRegistrationFormData> = async (
    data: UserRegistrationFormData,
  ) => {
    userRegisterMutation.mutate(data);
  };
  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (!session && status === "unauthenticated") {
    return <div>You must be logged in</div>;
  }
  if (role === "") {
    return (
      <div className="h-screen w-screen ">
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
          <div>I am a</div>
          <div className="flex gap-10">
            <button onClick={() => setRole("student")}>Student</button>
            <button onClick={() => setRole("employer")}>Employer</button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen ">
      {role === "student" && (
        <UserRegistrationForm onSubmit={handleUserFormSubmit} />
      )}
      {role === "employer" && (
        <EmployerRegistrationForm onSubmit={handleCompanyFormSubmit} />
      )}
    </div>
  );
};

export default Register;
