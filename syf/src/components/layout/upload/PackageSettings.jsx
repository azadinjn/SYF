
import { useState } from "react";

export default function PackageSettings({ onSettingsChange }) {
  const [packageName, setPackageName] = useState("");
  const [password, setPassword] = useState("");
  const [expirationHours, setExpirationHours] = useState("24");

  function updateSettings(name, value) {
    const settings = {
      packageName,
      password,
      expirationHours: Number(expirationHours),
      [name]: value,
    };

    onSettingsChange(settings);
  }

  function handleNameChange(event) {
    const value = event.target.value;
    setPackageName(value);
    updateSettings("packageName", value);
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
    updateSettings("password", value);
  }

  function handleExpirationChange(event) {
    const value = event.target.value;
    setExpirationHours(value);
    updateSettings("expirationHours", Number(value));
  }

  const inputStyle =
    "w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-colors duration-200 placeholder:text-slate-400 hover:border-marina-200 hover:bg-marina-50/20 focus:border-marina-200 focus:ring-2 focus:ring-marina-100";

  const labelStyle = "text-sm font-bold text-slate-700";

  return (
    <section className="w-full min-w-0 space-y-6 rounded-2xl border border-marina-100 bg-white p-4 shadow-sm sm:p-6">

      {/* Centered Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7h10M18 7h2M4 17h2m4 0h10M14 4v6M8 14v6"
            />
          </svg>
        </span>

        <div>
          <h3 className="text-lg font-extrabold text-marina-700">
            Package Settings
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Customize your file sharing package
          </p>
        </div>
      </div>

      {/* Settings Fields */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="packageName" className={labelStyle}>
            Package Name
            <span className="ml-1 font-medium text-slate-400">
              (Optional)
            </span>
          </label>

          <input
            id="packageName"
            type="text"
            value={packageName}
            onChange={handleNameChange}
            placeholder="e.g. School Documents"
            maxLength={100}
            className={inputStyle}
          />

          <p className="text-xs text-slate-400">
            Give your package a recognizable name.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor="expirationHours" className={labelStyle}>
            Expiration Period
          </label>

          <select
            id="expirationHours"
            value={expirationHours}
            onChange={handleExpirationChange}
            className={inputStyle}
          >
            <option value="24">24 hours (Default)</option>
            <option value="48">2 days</option>
            <option value="72">3 days</option>
            <option value="168">7 days (Maximum)</option>
          </select>

          <p className="text-xs text-slate-400">
            Your package will expire automatically.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-2 md:col-span-2">
          <label htmlFor="packagePassword" className={labelStyle}>
            Package Password
            <span className="ml-1 font-medium text-slate-400">
              (Optional)
            </span>
          </label>

          <input
            id="packagePassword"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter a password"
            autoComplete="new-password"
            className={inputStyle}
          />

          <p className="text-xs text-slate-400">
            Protect your package with a password.
          </p>
        </div>
      </div>
    </section>
  );
}
