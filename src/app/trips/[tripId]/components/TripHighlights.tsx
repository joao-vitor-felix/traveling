import { FC } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

const TripHighlights: FC<{ highlights: string[] }> = ({ highlights }) => {
  return (
    <div className="flex flex-col px-5 py-2 gap-1">
      <h2 className="font-semibold text-primary mb-2 text-lg">Destaques</h2>

      <div className="flex flex-wrap gap-y-3">
        {highlights.map(highlight => (
          <div key={highlight} className="flex items-center gap-2 w-1/2">
            <BsFillPatchCheckFill size={24} color="#717171" />

            <p className="text-gray-900 text-xs">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
