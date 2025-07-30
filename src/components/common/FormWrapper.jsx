export default function FormWrapper({ children, onSubmit }) {
  return (
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
  );
}
