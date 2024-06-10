import React, { ChangeEvent, useCallback } from 'react';
import {
	UseFormRegister,
	UseFormSetValue,
	FieldError,
	FieldValues,
} from 'react-hook-form';

interface DateTimeInputFieldProps {
  name: string
  value: string
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const DateTimeInputField: React.FC<DateTimeInputFieldProps> = ({
	name,
	value,
	register,
	setValue,
}) => {
	const dateValue = new Date(value);
	const timeZone = dateValue.getTimezoneOffset();
	const defaultValue = dateValue.toISOString().slice(0, 16);

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newDate = new Date(e.target.value);
			newDate.setMinutes(newDate.getMinutes() - timeZone);
			setValue(name, newDate.toISOString());
		},
		[name, setValue, timeZone]
	);

	return (
		<input
			type="datetime-local"
			defaultValue={defaultValue}
			{...(register(name),
			{
				onChange: onChangeHandler,
			})}
		/>
	);
};

export default DateTimeInputField;
