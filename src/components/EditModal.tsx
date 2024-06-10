import React from 'react';
import Modal from 'react-modal';
import { FieldValues } from 'react-hook-form';
import EditForm from './EditForm';

interface EditModalProps {
  isOpen: boolean
  onRequestClose: () => void
  data: FieldValues
  onSave: (data: FieldValues) => void
}

const EditModal: React.FC<EditModalProps> = ({
	isOpen,
	onRequestClose,
	data,
	onSave,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="modal"
			overlayClassName="overlay"
		>
			<EditForm data={data} onSave={onSave} />
		</Modal>
	);
};

export default EditModal;
