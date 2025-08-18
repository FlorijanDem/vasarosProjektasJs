import { useForm } from "react-hook-form";
import styles from "../../components/ExcursionDetails/ExcursionDetails.module.css";
import { DayPicker } from "react-day-picker";
const AddDateModal = ({ isOpen, onClose, onSave, excursion }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  if (!isOpen) return null;
  const availableDates = excursion.tour_dates.map((date) => new Date(date));

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-[#D9D9D9]/[var(--bg-opacity)] [--bg-opacity:40%] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="rounded bg-[var(--lighter-background-color)] p-8 relative w-1/3 shadow-2xl text-center items-center flex gap-8 flex-col max-md:w-9/10 max-h-9/10 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl">
          ×
        </button>
        <h2 className="text-3xl font-semibold mb-6">Add Date for an Excursion</h2>
        <div className={styles.calendarWrapper}>
                    <DayPicker
                      mode="single"
                      selected={undefined}
                      disabled={() => true}
                      modifiers={{ available: availableDates }}
                      modifiersClassNames={{ available: styles.highlight }}
                    />
                  </div>
        <form
          onSubmit={handleSubmit(onSave)}
          className="flex flex-col  gap-12 items-center"
        >
          <input type="hidden" {...register("id")} />
           <input
            {...register("date", {
              required: "Date is required",
            })}
            placeholder="Date"
            type="date"
            className="border-2 rounded-2xl h-3/16 w-full p-8 text-[2rem]"
          />
          {errors.date && (
            <p className="text-red-600">{errors.date.message}</p>
          )}
          <button
            type="submit"
            className="bg-[var(--lighter-background-color)] rounded-2xl border-2 h-1/2 w-1/2 text-[1.75rem] justify-center max-xl:text-[1.25rem] max-xl:h-1/2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDateModal;
