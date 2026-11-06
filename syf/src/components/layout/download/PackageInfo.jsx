import { formatFileSize } from "../../../utils/formatFileSize.js";

function PackageInfo({ packageInfo }) {
  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900">
        {packageInfo.packageName}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Created At</p>
          <p className="font-medium text-slate-800">
            {formatDate(packageInfo.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Expires At</p>
          <p className="font-medium text-slate-800">
            {formatDate(packageInfo.expiresAt)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Total Files</p>
          <p className="font-medium text-slate-800">
            {packageInfo.statistics.filesCount}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Total Size</p>
          <p className="font-medium text-slate-800">
            {formatFileSize(packageInfo.statistics.totalSize)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PackageInfo;