import Button from "../common/Button";
import CustomDateTimePicker from "../common/CustomDateTimePicker";

export default function TaskEditForm({
  title,
  description,
  dueDate,
  onTitleChange,
  onDescChange,
  onDueDateChange,
  onCancel,
  onSave,
  isSaving,
}) {
  return (
    <div className="space-y-3">
      <input
        value={title}
        onChange={onTitleChange}
        className="w-full text-sm font-medium border-none outline-none bg-transparent dark:text-white"
        placeholder="Task title"
        disabled={isSaving}
      />
      <textarea
        value={description}
        onChange={onDescChange}
        className="w-full text-xs border-none outline-none bg-transparent resize-none dark:text-gray-200"
        placeholder="Add description"
        rows="2"
        disabled={isSaving}
      />
      {/* <CustomDateTimePicker
        value={dueDate}
        onChange={onDueDateChange}
        showTime={true}
        timeInterval={15}
      /> */}
      <input
        type="date"
        name="dueDate"
        id="dueDate"
        value={dueDate.date}
        onChange={(e) => onDueDateChange({ ...dueDate, date: e.target.value })}
        className="hover:bg-gray-100 dark:bg-gray-200 dark:hover:bg-gray-300 transition-colors rounded px-2 py-1 text-sm"
      />
      <br />
      <input
        type="time"
        name="dueDate"
        id="dueDate"
        value={dueDate.time}
        onChange={(e) => onDueDateChange({ ...dueDate, time: e.target.value })}
        className="hover:bg-gray-100 dark:bg-gray-200 dark:hover:bg-gray-300 transition-colors rounded px-2 py-1 text-sm"
      />

      <div className="flex justify-end gap-2 border-t pt-3 border-gray-100">
        <Button onClick={onCancel} variant="cancel" width="inline">Cancel</Button>
        <Button
          onClick={onSave}
          disabled={!title.trim() || isSaving}
          variant="primary"
          width="inline"
        >
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
