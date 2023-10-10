"use client";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { FC } from "react";
import * as Sentry from "@sentry/nextjs";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const ErrorPage: FC<ErrorProps> = ({ error, reset }) => {
  Sentry.captureException(error);

  return (
    <main className="flex flex-col items-center justify-center pt-12 gap-4">
      <h1 className="text-xl font-semibold text-primary lg:text-3xl">
        Algo deu errado! Tente novamente mais tarde.
      </h1>
      <Image src="/500-error.svg" alt="404" width={400} height={400} />
      <Button onClick={() => reset()}></Button>
    </main>
  );
};

export default ErrorPage;
