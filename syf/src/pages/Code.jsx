
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
    <main className="page-canvas min-h-[calc(100vh-4.5rem)] overflow-hidden">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">

        {transfer && (
          <>
            <div className="animate-fade-up space-y-3 text-center">
              

              <h1 className="page-title text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl">
                Your Files Are Ready!
              </h1>

              <p className="mx-auto max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Your package has been uploaded successfully. Share the code
                or scan the QR code to access your files.
              </p>
            </div>

            <div className="surface-card animate-fade-up grid overflow-hidden border border-marina-100 md:grid-cols-[1.15fr_.85fr]">
              <QRCodeDisplay code={transfer.code} />
              <CodeDisplay code={transfer.code} />
            </div>
          </>
        )}

        <div className="animate-fade-up">
          <SearchForm
            code={code}
            setCode={setCode}
            isSearching={isSearching}
            onSearch={handleSearch}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="animate-fade-up rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

      </div>
    </main>
  );
}

export default Code;
