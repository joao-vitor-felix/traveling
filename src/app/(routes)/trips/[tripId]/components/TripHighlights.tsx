import { FC } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

const TripHighlights: FC<{ highlights: string[] }> = ({ highlights }) => {
  return (
    <div className="flex flex-col px-5 py-2 gap-1 lg:p-0 lg:mt-12">
      <h2 className="font-semibold text-primary mb-2 lg:text-xl">Destaques</h2>

      <div className="flex flex-wrap gap-y-3 lg:mt-2">
        {highlights.map(highlight => (
          <div
            key={highlight}
            className="flex items-center gap-2 w-1/2 lg:gap-3"
          >
            <BsFillPatchCheckFill size={24} color="#717171" />

            <p className="text-gray-900 text-xs lg:text-base">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
