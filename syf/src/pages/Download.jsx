
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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Download Files
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Access your shared package and download its files.
        </p>
      </div>

      {requiresPassword ? (
        <PasswordForm
          password={password}
          setPassword={setPassword}
          onSubmit={handlePasswordSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <>
          <PackageInfo packageInfo={transfer} />

          <ReceivedFiles
            files={transfer.files}
            code={code}
            password={accessPassword}
          />
        </>
      )}

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

export default Download;
