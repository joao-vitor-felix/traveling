import { BiSolidPlaneTakeOff } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col gap-1 items-center p-5 mt-auto">
      <div className="flex items-center gap-1">
        <BiSolidPlaneTakeOff size={28} />
        <h1 className="text-gray-900 text-lg">Traveling</h1>
      </div>
      <p className="text-gray-900 text-sm">Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
