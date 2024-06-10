import React, { ChangeEvent, useCallback } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface DateInputFieldProps {
  name: string
  value: string
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const DateInputField: React.FC<DateInputFieldProps> = ({
	name,
	value,
	register,
	setValue,
}) => {
	const dateValue = new Date(value);
	const defaultValue = dateValue.toISOString().slice(0, 10);

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newDate = new Date(e.target.value);
			const newValue = newDate.toISOString().slice(0, 10);
			setValue(name, newValue);
		},
		[name, setValue]
	);

	return (
		<input
			type="date"
			defaultValue={defaultValue}
			{...(register(name),
			{
				onChange: onChangeHandler,
			})}
		/>
	);
};

export default DateInputField;
