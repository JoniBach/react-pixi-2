import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  const q = search.slice(1).split("=");

  const params = { [q[0]]: q[1] };

  return params;
}
