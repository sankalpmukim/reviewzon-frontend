import { useParams } from "react-router";

export const OutputDisplay = () => {
  const { uniqueKey } = useParams();
  return <div>{uniqueKey}</div>;
};
