import Image from "next/image";
import { FC } from "react";

type IconProps = {
  path: string;
  name: string;
  alt: string;
};

const Icon: FC<IconProps> = ({ path, name, alt }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <Image src={path} width={40} height={40} alt={alt} />
      <span className="text-primary">{name}</span>
    </div>
  );
};

export default Icon;
