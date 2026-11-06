
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import CodeDisplay from "../components/layout/code/CodeDisplay.jsx";
import QRCodeDisplay from "../components/layout/code/QRCodeDisplay.jsx";
import SearchForm from "../components/layout/code/SearchForm.jsx";

import { searchPackage } from "../services/packageService.js";

function Code() {
  const location = useLocation();
  const navigate = useNavigate();

  const transfer = location.state?.transfer;

  const [code, setCode] = useState(
  location.state?.initialCode || ""
  );  
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (isSearching || code.trim().length !== 5) {
      return;
    }

    setIsSearching(true);
    setError("");

    try {
      const packageData = await searchPackage(code);

      navigate(`/download/${code.trim().toUpperCase()}`, {
        state: {
          transfer: packageData,
        },
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">

      {transfer && (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Your Files Are Ready!
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Your package has been uploaded successfully.
            </p>
          </div>

          <CodeDisplay code={transfer.code} />

          <QRCodeDisplay code={transfer.code} />
        </>
      )}

      <SearchForm
        code={code}
        setCode={setCode}
        isSearching={isSearching}
        onSearch={handleSearch}
      />

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
        >
          {error}
        </p>
      )}

    </main>
  );
}

export default Code;
