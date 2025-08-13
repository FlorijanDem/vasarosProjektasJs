import { useForm } from "react-hook-form";
import { useEffect } from "react";
const ModifyExcursionModal = ({ isOpen, onClose, excursion, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...excursion,
    },
  });

  useEffect(() => {
    if (isOpen)
      reset({
        ...excursion,
      });
  }, [isOpen, excursion, reset]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="rounded bg-[var(--lighter-background-color)] p-8 relative w-1/3 shadow-2xl text-center flex gap-8 flex-col max-md:w-9/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl">
          ×
        </button>
        <h2 className="text-3xl font-semibold mb-6">Modify Excursion</h2>

        <form
          onSubmit={handleSubmit(onSave)}
          className="flex flex-col  gap-12 items-center"
        >
          <input type="hidden" {...register("id")} />
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Excursion Title"
            className="border-2 rounded-2xl h-2/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
          <input
            {...register("photo_url", { required: "Photo Url is required" })}
            placeholder="Photo Url"
            className="border-2 rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.photo_url && (
            <p className="text-red-600">{errors.photo_url.message}</p>
          )}
          <input
            {...register("duration", { required: "Duration is required" })}
            placeholder="Duration"
            className="border-2 rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.duration && (
            <p className="text-red-600">{errors.duration.message}</p>
          )}
          <input
            {...register("dates", { required: "Date is required" })}
            placeholder="Date"
            className="border-2 rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          {errors.dates && (
            <p className="text-red-600">{errors.dates.message}</p>
          )}
          <input
            {...register("category_id", {
              required: "Category ID is required",
            })}
            placeholder="Category ID"
            className="border-2 rounded-2xl h-3/16 w-6/10 p-8 text-[2rem]"
          />
          <button
            type="submit"
            className="bg-[var(--lighter-background-color)] rounded-2xl border-2 h-3/16/16 w-3/16 text-[1.75rem] justify-center max-xl:text-[1.25rem] max-xl:h-3/16"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyExcursionModal;
