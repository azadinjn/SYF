
import { formatFileSize } from "../../../utils/formatFileSize.js";

function PackageInfo({ packageInfo }) {
  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  const infoItems = [
    {
      label: "Created At",
      value: formatDate(packageInfo.createdAt),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 5.25h15A.75.75 0 0 1 20.25 6v13.5a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75Z"
          />
        </svg>
      ),
    },
    {
      label: "Expires At",
      value: formatDate(packageInfo.expiresAt),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2m5-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      label: "Total Files",
      value: packageInfo.statistics.filesCount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 3.75h5.25L18 8.5v11.75H6V5.75A2 2 0 0 1 8 3.75Zm5 0V9h5M9 13h6m-6 3h6"
          />
        </svg>
      ),
    },
    {
      label: "Total Size",
      value: formatFileSize(packageInfo.statistics.totalSize),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7.5h16M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12A1.5 1.5 0 0 1 18 19.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="animate-fade-up rounded-2xl border border-marina-100 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-marina-300 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-marina-50 text-marina-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 3.75h5.25L18 8.5v11.75H6V5.75A2 2 0 0 1 8 3.75Zm5 0V9h5M9 13h6m-6 3h6"
            />
          </svg>
        </span>

        <div className="min-w-0">
          <h2 className="break-words text-xl font-extrabold text-marina-700">
            {packageInfo.packageName}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Package Information
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-marina-50 text-marina-700">
              {item.icon}
            </span>

            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 break-words text-sm font-bold text-slate-800">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PackageInfo;
