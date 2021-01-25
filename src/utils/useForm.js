import { useState, useEffect, useCallback } from 'react';
import ERROR_MESSAGES from './errorMessages';

const VALUE = 'value';
const ERROR = 'error';

/**
 *
 * @param {object} value
 */
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 *
 * @param {string} value
 * @param {boolean} isRequired
 */
function isFieldRequired(value, isRequired) {
  if (!value && isRequired) return ERROR_MESSAGES.BLANK_FIELD;
  return '';
}

function getPropValues(stateSchema, prop) {
  return Object.keys(stateSchema).reduce((accumulator, curr) => {
    accumulator[curr] = !prop ? false : stateSchema[curr][prop];

    return accumulator;
  }, {});
}

/**
 *
 * @param {object} stateSchema
 * @param {object} stateValidatorSchema
 * @param {function} submitFormCallback
 */
function useForm(
  stateSchema = {},
  stateValidatorSchema = {},
  submitFormCallback,
) {
  const [state, setStateSchema] = useState(stateSchema);
  const [values, setValues] = useState(getPropValues(state, VALUE));
  const [errors, setErrors] = useState(getPropValues(state, ERROR));
  const [dirty, setDirty] = useState(getPropValues(state));
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const validateFormFields = useCallback(
    (name, value) => {
      const validator = stateValidatorSchema;
      if (!validator[name]) return undefined;

      const field = validator[name];

      let error = '';
      error = isFieldRequired(value, field.required);

      if (isObject(field.validator) && error === '') {
        const fieldValidator = field.validator;
        const testFunc = fieldValidator.func;
        if (!testFunc(value, values)) {
          error = fieldValidator.error;
        }
      }
      return error;
    },
    [stateValidatorSchema, values],
  );

  const handleOnChange = useCallback(
    (evt) => {
      setIsDirty(true);

      const { name, value } = evt.target;

      const error = validateFormFields(name, value);

      setValues((prevState) => ({ ...prevState, [name]: value }));
      setErrors((prevState) => ({ ...prevState, [name]: error }));
      setDirty((prevState) => ({ ...prevState, [name]: true }));
    },
    [validateFormFields],
  );

  const setInitialErrorState = useCallback(() => {
    Object.keys(errors).map((name) => setErrors((prevState) => ({
      ...prevState,
      [name]: validateFormFields(name, values[name]),
    })));
  }, [errors, values, validateFormFields]);

  const validateErrorState = useCallback(
    () => Object.values(errors).some((error) => error),
    [errors],
  );

  useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true);
    setInitialErrorState();
  }, []);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty]);

  const handleOnSubmit = useCallback(
    (evt) => {
      evt.preventDefault();

      if (!validateErrorState()) {
        submitFormCallback(values);
      }
    },
    [validateErrorState, submitFormCallback, values],
  );

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    disable,
    setValues,
    setErrors,
    dirty,
  };
}

export default useForm;
