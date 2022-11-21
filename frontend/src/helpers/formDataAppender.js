export const formDataAppender = fields => {
  const formData = new FormData();
  const entriesForAppend = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    []
  );
  Object.entries(entriesForAppend).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};
