import {useEffect, useState} from "react";

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface Handler<T> {
  value: T;
  onChange: (e: OnChangeEvent) => void;
}

function useInput<T>(
  initialValue: T,
): Handler<T> {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (e: OnChangeEvent) => {
    setValue(e.target.value as unknown as T)
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    onChange
  };
}

export default useInput;
