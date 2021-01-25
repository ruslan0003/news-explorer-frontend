import React from 'react';

function useForm(initialValues) {
  const [inputs, setInputs] = React.useState(initialValues);

  function handleSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    }
    console.log(inputs);
  }

  function handleInputChange(evt) {
    evt.persist();
    setInputs((i) => ({ ...i, [evt.target.name]: evt.target.value }));
  }

  return { handleSubmit, handleInputChange, inputs };
}

export default useForm();
