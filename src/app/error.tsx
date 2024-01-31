"use client";

import Button from "@/components/Button/Button";
import Image from "next/image";
import { FC } from "react";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const ErrorPage: FC<ErrorProps> = ({ error, reset }) => {
  Sentry.captureException(error);

  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-center pt-12 gap-4">
      <h1 className="text-base text-center font-semibold text-primary lg:text-3xl">
        Algo deu errado! Tente novamente mais tarde.
      </h1>
      <Image src="/500-error.svg" alt="404" width={400} height={400} />
      <div className="flex flex-col gap-2 lg:flex-row ">
        <Button onClick={() => reset()} className="w-60">
          Tentar novamente
        </Button>
        <Button onClick={handleHomeClick} className="w-60">
          Ir para a página inicial
        </Button>
      </div>
    </main>
  );
};

export default ErrorPage;
