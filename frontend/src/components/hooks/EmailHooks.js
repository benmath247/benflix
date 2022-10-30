import { useState, useEffect } from "react";
import { isEmail } from "validator";

function EmailHooks() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (input.length === 0) {
        setError("email cannot be empty");
      } else {
        setError(false);
      }
    }
  }, [input, onBlur, onFocus]);

  return [input, setInput, error, setOnBlur, setOnFocus];
}

export default EmailHooks;
