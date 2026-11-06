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

  return (
    <section className="w-full min-w-0 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">Package settings</h3>

      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label
            htmlFor="packageName"
            className="text-sm font-medium text-slate-700"
          >
            Package name (optional)
          </label>
          <input
            id="packageName"
            type="text"
            value={packageName}
            onChange={handleNameChange}
            placeholder="e.g. School Documents"
            maxLength={100}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label
            htmlFor="expirationHours"
            className="text-sm font-medium text-slate-700"
          >
            Expiration period
          </label>
          <select
            id="expirationHours"
            value={expirationHours}
            onChange={handleExpirationChange}
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="24">24 hours (Default)</option>
            <option value="48">2 days</option>
            <option value="72">3 days</option>
            <option value="168">7 days (Maximum)</option>
          </select>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label
            htmlFor="packagePassword"
            className="text-sm font-medium text-slate-700"
          >
            Password (optional)
          </label>
          <input
            id="packagePassword"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter a password"
            autoComplete="new-password"
            className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </section>
  );
}
