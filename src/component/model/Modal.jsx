const Modal = ({ children, text, onClose }) => {
  return (
    <>
      <div
        className="
        fixed
        inset-0
        z-[1050]
        bg-black/60
        backdrop-blur-sm
     
        p-4
      "
      >
        <div
          style={{
            height: "90vh",
          }}
          className="
          w-full
          max-w-xl
          mx-auto
        flex 
        flex-col
          bg-slate-900
          border
          border-slate-700
          rounded-3xl
          shadow-2xl
          p-4
          overflow-y-auto
          md:p-6
        "
        >
          {/* Header */}
          <div className="flex items-center justify-between  border-b border-slate-700 pb-3">
            <h4 className="text-white font-semibold text-lg mb-0">{text}</h4>

            <button
              onClick={onClose}
              className="
              flex
              items-center
              justify-center
              h-10
              w-10
              rounded-full
              bg-red-600
              text-white
              hover:bg-red-700
              transition-colors
            "
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div>{children}</div>

          {/* Footer */}
          <div className="mt-auto pt-2 border-t border-slate-700">
            <button
              onClick={onClose}
              className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              font-medium
              py-2
              rounded-xl
              transition-colors
            "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
