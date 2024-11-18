import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  return (
    <form className="flex gap-2 bg-background px-2 h-9 rounded items-center border border-zinc-950">
      <input
        type="search"
        className="w-full outline-none focus:outline-none bg-transparent text-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (search) {
            searchParams.set("search", search);
            searchParams.set("page", "1");
          } else {
            searchParams.delete("search");
            searchParams.delete("page");
          }
          setSearchParams(searchParams);
        }}
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}

export default SearchField;
