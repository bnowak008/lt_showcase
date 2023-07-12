import styled from "@emotion/styled"
import React, { FC, KeyboardEventHandler, useState } from "react"

type Props = {
  value: number,
  min: number,
  max: number,
  label: string,
  onChange: (value: number | undefined) => void
}

export const NumericRangeInput: FC<Props> = ({ value, min, max, label, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(`${value}`);
  const [error, setError] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      setError(`Choose between ${min} and ${max}`);
      setInputValue('');
      onChange(undefined);

      return;
    }

    const num = Number(e.currentTarget.value);

    if (isNaN(num)) {
      setError('Input Must be a Number');
      setInputValue(e.currentTarget.value);
    } else if (num < min) {
      setError(`Number must be greater than ${min}`);
      setInputValue(e.currentTarget.value);
    } else if (num > max) {
      setError(`Number must be less than ${max}`);
      setInputValue(e.currentTarget.value);
    } else {
      setError('');
      setInputValue(`${num}`);
      onChange(num);
    }
  }

  return (
    <InputWrapper>
      <InnerWrapper>
        <label className={inputValue.length ? 'active' : ''}>{label}</label>
        <input value={inputValue} onChange={handleChange}/>
      </InnerWrapper>
      {error && <p>{error}</p>}
    </InputWrapper>
  )
}

const InputWrapper = styled.div({
  position: "relative",
  marginBottom: ".25rem",
  '& p': {
    position: "absolute",
    top: "30px",
    fontSize: '.8rem',
    color: 'red',
  }
});

const InnerWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  marginBottom: ".25rem",
  '& label': {
    position: "absolute",
    transition: "ease-out 0.2s",
    pointerEvents: "none",
    fontSize: "15px",
    bottom: "7px",
    color: "#9e9e9e",
    '&.active': {
      fontSize: "13px",
      color: '#26a69a',
      bottom: "35px",
      '& ~ input': {
        borderBottom: '1px solid #26a69a',
        boxShadow: '0 1px 0 0 #26a69a',
      }
    }
  },
  '& input': {
    border: 0,
    height: "40px",
    fontSize: "15px",
    transition: "ease-out 0.2s",
    borderBottom: "1px solid #9e9e9e",
    '&:focus': {
      outline: "none",
    }
  }
})
