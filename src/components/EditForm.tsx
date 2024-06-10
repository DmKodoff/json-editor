import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import InputField from './InputField';

interface EditFormProps {
  data: FieldValues
  onSave: (data: FieldValues) => void
}

const EditForm: React.FC<EditFormProps> = ({ data, onSave }) => {
	const { register, setValue, handleSubmit } = useForm({ defaultValues: data });

	return (
		<form onSubmit={handleSubmit(onSave)} className="form-group">
			{Object.entries(data).map(([key, value]) => {
				if (typeof value === 'object' || Array.isArray(value)) {
					return null;
				}

				return (
					<div key={key}>
						<label htmlFor={key}>{key}</label>
						<InputField
							name={key}
							value={value}
							register={register}
							setValue={setValue}
						/>
					</div>
				);
			})}

			<button type="submit">Save</button>
		</form>
	);
};

export default EditForm;
