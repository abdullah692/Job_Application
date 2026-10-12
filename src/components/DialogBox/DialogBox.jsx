
import { ClipLoader } from "react-spinners";

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const confirmButtonStyle =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-blue-900 hover:bg-blue-800";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Title */}
        <h2
          id="confirm-dialog-title"
          className="mb-3 text-center text-xl font-semibold text-gray-800"
        >
          {title}
        </h2>

        {/* Message */}
        <p className="mb-6 text-center text-sm text-gray-500">
          {message}
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${confirmButtonStyle}`}
          >
            {loading ? (
              <>
                <ClipLoader color="#FFFFFF" size={15} />
                Processing...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;


// <ConfirmDialog
//   isOpen={showDeleteDialog}
//   title="Delete Job?"
//   message="Are you sure you want to delete this job? This action cannot be undone."
//   confirmText="Delete Job"
//   cancelText="Cancel"
//   onConfirm={handleDeleteJob}
//   onClose={() => {
//     setShowDeleteDialog(false);
//     setSelectedJobId(null);
//   }}
//   loading={deletingJobId !== null}
//   variant="danger"
// />