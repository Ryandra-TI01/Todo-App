export default function FooterForm({ title, subtitle, onClick }) {
  return (
    <p className="mt-6 text-center text-sm text-gray-600">
      {title}{' '}
      <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer underline" onClick={onClick}>
        {subtitle}
      </span>
    </p>
  );
}
