import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useDebouncedValue } from "~/hooks/hooks";
import { useQueryStore } from "~/stores/query.store";

const Search: React.FC = () => {
  const [storeQuery, setStoreQuery] = useQueryStore((store) => [
    store.query,
    store.setQuery,
  ]);

  const [query, setQuery] = useState<string>(storeQuery);
  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.currentTarget.value);
  };
  const debouncedQuery = useDebouncedValue(query);
  useEffect(() => {
    setStoreQuery(debouncedQuery);
  }, [debouncedQuery, setStoreQuery]);
  console.log("render");
  return (
    <div>
      <Input name="query" type="text" value={query} onChange={onQueryChange} />
    </div>
  );
};

export default Search;
