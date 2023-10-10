import Button from "@/components/Button/Button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada | Traveling",
  description: "Não encontramos o que procura."
};

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center pt-12 gap-4">
      <h1 className="text-xl font-semibold text-primary lg:text-3xl">
        Não encontramos o que procura.
      </h1>
      <Image src="/400-error.svg" alt="404" width={400} height={400} />
      <Link href="/" className="w-60">
        <Button>Ir para a página inicial</Button>
      </Link>
    </main>
  );
};

export default NotFoundPage;
