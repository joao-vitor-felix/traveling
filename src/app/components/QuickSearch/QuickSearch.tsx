import Icon from "./components/Icon";

const QuickSearch = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center px-4">
        <div className="w-full h-[1px] bg-primary"></div>
        <span className="whitespace-nowrap text-base font-medium px-4 text-primary">
          Tente pesquisar por
        </span>
        <div className="w-full h-[1px] bg-primary"></div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 px-6 lg:justify-center lg:gap-40 lg:mt-10">
        <Icon
          href="/trips/search?text=Chalé"
          path="/cottage-icon.png"
          name="Chalé"
          alt="Pesquisar Chalés"
        />
        <Icon
          href="/trips/search?text=Fazenda"
          path="/farm-icon.png"
          name="Fazenda"
          alt="Pesquisar Fazendas"
        />
        <Icon
          href="/trips/search?text=Hotel"
          path="/hotel-icon.png"
          name="Hotel"
          alt="Pesquisar Hotéis"
        />
        <Icon
          href="/trips/search?text=Pousada"
          path="/inn-icon.png"
          name="Pousada"
          alt="Pesquisar Pousadas"
        />
      </div>
    </div>
  );
};

export default QuickSearch;
