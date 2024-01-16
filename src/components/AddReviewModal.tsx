import React, { useRef, useLayoutEffect } from "react";
import AddReviewForm from "./AddReview";

const AddReviewModal: React.FC<{ companyId: string }> = ({ companyId }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = React.useState(false);

  useLayoutEffect(() => {
    if (!dialogRef.current) return;
    if (showModal) {
      dialogRef.current.showModal();
      return;
    }
    dialogRef.current.close();
  }, [showModal]);

  const handleDialogOnClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="pt-3">
      <button
        type="button"
        className="rounded-full bg-primary px-6 py-2 font-bold text-white"
        onClick={handleDialogOnClick}
      >
        Add review
      </button>
      <dialog
        className="overflow-hidden rounded-2xl "
        onClose={() => setShowModal(false)}
        ref={dialogRef}
      >
        <AddReviewForm companyId={companyId} setShowModal={setShowModal} />
      </dialog>
    </div>
  );
};

export default AddReviewModal;
