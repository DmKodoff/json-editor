import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import DateInputField from './DateInputField';
import DateTimeInputField from './DateTimeInputField';

type InputFieldValue = string | number | boolean

interface InputFieldProps {
  name: string
  value: InputFieldValue
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const InputField: React.FC<InputFieldProps> = ({
	name,
	value,
	register,
	setValue,
}) => {
	if (typeof value === 'boolean') {
		return <input type="checkbox" defaultChecked={value} {...register(name)} />;
	}
	if (typeof value === 'number') {
		return <input type="number" {...register(name)} />;
	}
	if (typeof value === 'string' && value.includes('@')) {
		return <input type="email" {...register(name)} />;
	}

	if (typeof value === 'string' && !isNaN(Date.parse(value))) {
		const hasTime = /T\d{2}:\d{2}:\d{2}/.test(value);

		if (hasTime) {
			return (
				<DateTimeInputField
					name={name}
					value={value}
					register={register}
					setValue={setValue}
				/>
			);
		}

		return (
			<DateInputField
				name={name}
				value={value}
				register={register}
				setValue={setValue}
			/>
		);
	}

	if (typeof value === 'string' && value.length > 50) {
		return <textarea rows={4} {...register(name)} />;
	}

	if (typeof value === 'string') {
		return <input type="text" {...register(name)} />;
	}

	return null;
};
export default InputField;
