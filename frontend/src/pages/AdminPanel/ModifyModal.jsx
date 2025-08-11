import { useForm } from "react-hook-form";
import { useEffect } from "react";

const ModifyExcursionModal = ({ isOpen, onClose, excursion, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: excursion
  });

  useEffect(() => {
    if (isOpen) {
      reset(excursion);  
    }
  }, [isOpen, excursion, reset]);

  const onSubmit = data => {
    onSave(data); 
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="rounded bg-white p-8 relative w-1/3 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl">×</button>
        <h2 className="text-3xl font-semibold mb-6">Modify Excursion</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Excursion Title"
            className="border p-2 rounded"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyExcursionModal;
