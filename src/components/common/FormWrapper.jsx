export default function FormWrapper({ title, children, onSubmit }) {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
}
