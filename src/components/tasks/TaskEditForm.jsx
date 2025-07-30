import CustomDateTimePicker from "../common/CustomDateTimePicker";

export default function TaskEditForm({
  title, description, dueDate, onTitleChange, onDescChange,
  onDueDateChange, onCancel, onSave, isSaving
}) {
  return (
    <div className="space-y-3">
      <input
        value={title}
        onChange={onTitleChange}
        className="w-full text-sm font-medium border-none outline-none bg-transparent"
        placeholder="Task title"
        disabled={isSaving}
      />
      <textarea
        value={description}
        onChange={onDescChange}
        className="w-full text-xs border-none outline-none bg-transparent resize-none"
        placeholder="Add description"
        rows="2"
        disabled={isSaving}
      />
      <CustomDateTimePicker
        value={dueDate}
        onChange={onDueDateChange}
        showTime={true}
        timeInterval={15}
      />
      <div className="flex justify-end gap-2 border-t pt-3 border-gray-100">
        <button onClick={onCancel} className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded">
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!title.trim() || isSaving}
          className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
