import { useState, useEffect } from "react";
import { isStrongPassword } from "validator";

function PasswordHooks() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onBlur || (onFocus && input.length > 1)) {
      if (input.length === 0) {
        setError("passwword cannot be empty");
      } else if (!isStrongPassword(input)) {
        setError(
          "Password must be 8 characters long, 1 uppercase, 1 lowercase, 1 number, and a special character"
        );
      } else {
        setError(false);
      }
    }
  }, [input, onBlur, onFocus]);

  return [input, setInput, error, setError, setOnBlur, setOnFocus];
}

export default PasswordHooks;
