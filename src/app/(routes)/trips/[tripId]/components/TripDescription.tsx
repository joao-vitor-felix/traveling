import { FC } from "react";

const TripDescription: FC<{ description: string }> = ({ description }) => {
  return (
    <div className="flex flex-col px-5 py-3 lg:p-0">
      <h2 className="font-semibold text-lg text-primary lg:text-xl">
        Sobre a viagem
      </h2>
      <p className="text-sm leading-6 text-gray-900 mt-1 lg:mt-5 lg:text-base lg:leading-7">
        {description}
      </p>
    </div>
  );
};

export default TripDescription;
