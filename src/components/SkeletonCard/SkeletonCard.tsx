import Skeleton from "react-loading-skeleton";
import { FC } from "react";

type SkeletonCardProps = {
  trips: number;
  height?: number;
  width?: number;
};

const SkeletonCard: FC<SkeletonCardProps> = ({
  trips,
  height = 360,
  width = 280
}) => {
  return (
    <>
      {Array(trips)
        .fill(0)
        .map((item, index) => (
          <Skeleton height={height} width={width} key={index} />
        ))}
    </>
  );
};

export default SkeletonCard;
