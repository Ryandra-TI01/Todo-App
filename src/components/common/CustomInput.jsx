// export default function CustomInput({
//   label,
//   name,
//   type = "text",
//   value,
//   onChange,
//   error,
// }) {
//   return (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-sm font-medium mb-1">
//         {label}
//       </label>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         className={`w-full px-3 py-2 border rounded outline-none transition 
//           ${
//             error
//               ? "border-red-500 focus:ring-red-400 focus:border-red-500"
//               : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
//           }`}
//       />
//       {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
//     </div>
//   );
// }
export default function CustomInput({
  label,
  name,
  error,
  ...props
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        {...props}
        className={`w-full px-3 py-2 border rounded outline-none transition 
          ${error ? "border-red-500 focus:ring-red-500" : "border-purple-300 focus:ring-purple-500"}`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
