import { Link } from "react-router-dom";

export const GetLinks = (path, label) => {
  return (
    <Link
      id={Math.random()}
      to={{
        pathname: path,
      }}
    >
      {label}
    </Link>
  );
};
