
import { useState } from "react";
import { Navigate, useLocation, useParams } from "react-router";

import PasswordForm from "../components/layout/download/PasswordForm.jsx";
import PackageInfo from "../components/layout/download/PackageInfo.jsx";
import ReceivedFiles from "../components/layout/download/ReceivedFiles.jsx";

import { searchPackage } from "../services/packageService.js";

function Download() {
  const { code } = useParams();
  const location = useLocation();

  const [transfer, setTransfer] = useState(
    location.state?.transfer || null
  );

  const [password, setPassword] = useState("");
  const [accessPassword, setAccessPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Direct access must go through the code search page.
  if (!location.state?.transfer) {
    return (
      <Navigate
        to="/code"
        replace
        state={{ initialCode: code }}
      />
    );
  }

  async function handlePasswordSubmit() {
    if (isSubmitting || password.length === 0) return;

    setIsSubmitting(true);
    setError("");

    try {
      const packageData = await searchPackage(code, password);

      if (packageData.requiresPassword) {
        throw new Error("Password verification is required.");
      }

      setTransfer(packageData);
      setAccessPassword(password);
      setPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to unlock this package."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const requiresPassword = transfer?.requiresPassword === true;

  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-b from-marina-50/40 via-white to-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">

        {/* Page Header */}
        <div className="animate-fade-up space-y-3 text-center">

          <h1 className="text-3xl font-extrabold tracking-tight text-marina-700 sm:text-4xl">
            Download Files
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Access your shared package and download your files
            quickly and securely.
          </p>
        </div>

        {/* Password or Download Content */}
        {requiresPassword ? (
          <div className="animate-fade-up mx-auto w-full max-w-xl">
            <PasswordForm
              password={password}
              setPassword={setPassword}
              onSubmit={handlePasswordSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        ) : (
          <div className="animate-fade-up flex flex-col gap-6">
            <PackageInfo packageInfo={transfer} />

            <ReceivedFiles
              files={transfer.files}
              code={code}
              password={accessPassword}
            />
          </div>
        )}

        {/* Error Message */}
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

export default Download;
