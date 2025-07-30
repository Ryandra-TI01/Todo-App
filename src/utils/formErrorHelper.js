// helper.js (atau di atas file ini juga bisa)
const handleServerValidationErrors = (err, setError) => {
  if (err.response?.status === 422 && err.response.data?.errors) {
    Object.entries(err.response.data.errors).forEach(([field, messages]) => {
      setError(field, {
        type: "server",
        message: messages[0],
      });
    });
    return true;
  }
  return false;
};
