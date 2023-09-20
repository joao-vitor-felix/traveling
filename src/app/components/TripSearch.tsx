"use client";

import Button from "@/components/Button/Button";
import CurrencyInput from "@/components/CurrencyInput/CurrencyInput";
import DatePicker from "@/components/DatePicker/DatePicker";
import Input from "@/components/Input/Input";

const TripSearch = () => {
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-xl mb-2 text-center">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>
      <div className="flex flex-col justify-center item-center gap-3">
        <Input placeholder="Onde deseja ir?" />
        <div className="flex gap-2">
          <DatePicker onChange={() => null} placeholderText="Data desejada" />
          <CurrencyInput placeholder="Orçamento desejado" />
        </div>
      </div>
      <Button className="mt-5">Buscar</Button>
    </div>
  );
};

export default TripSearch;
