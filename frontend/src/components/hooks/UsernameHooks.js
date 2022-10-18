import { useState, useEffect } from "react";
import { isAlphanumeric } from "validator";

function UsernameHooks() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (input.length === 0) {
        setError("username cannot be empty");
      } else if (!isAlphanumeric(input)) {
        setError("username cannot have special characters");
      } else {
        setError(false);
      }
    }
  }, [input, onBlur, onFocus]);

  return [input, setInput, error, setOnBlur, setOnFocus];
}

export default UsernameHooks;
