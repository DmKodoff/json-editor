/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useMemo, useState } from 'react';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateRow } from '../features/data/dataSlice';
import EditModal from './EditModal';
import { FieldValues } from 'react-hook-form';

const DataTable = () => {
	const data = useSelector((state: RootState) => state.data.data);
	const dispatch = useDispatch();
	const [editingRow, setEditingRow] = useState<unknown|null>(null);

	const columns = useMemo<ColumnDef<unknown>[]>(
		() =>
			(data.length
				? [
					{
						header: 'Edit',
						accessorKey: 'edit',
						enableSorting: false,
						cell: cell => (
							<button type="button" onClick={() => setEditingRow(cell.row.original)}>
								Edit
							</button>
						),
					},
					...Object.entries(data[0] as Record<string, unknown>)
						.filter(([, value]) => typeof value !== 'object')
						.map(([key]) => {
							return {
								header: key.toUpperCase(),
								accessorKey: key,
							};
						}),
				]
				: []),

		[data]
	);

	const handleSave = (row: unknown) => {
    	if (typeof editingRow === 'object' && editingRow !== null && 'id' in editingRow && typeof editingRow.id === 'string') {
			dispatch(updateRow({ id: editingRow.id, data: row }));
			setEditingRow(null);
		}
	};

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	const { rows } = table.getRowModel();

	const tableContainerRef = React.useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 33,
		getScrollElement: () => tableContainerRef.current,
		// measure dynamic row height, except in firefox because it measures table border height incorrectly
		measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
      	? element => element?.getBoundingClientRect().height
      	: undefined,
		overscan: 5,
	});

	return (
		<div className="table-component">
			<div className="container" ref={tableContainerRef}>
				<table>
					<thead
						style={{
							display: 'grid',
							position: 'sticky',
							top: 0,
							zIndex: 1,
						}}
					>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											style={{
												width: header.getSize(),
											}}
										>
											<div
												{...{
													className: header.column.getCanSort()
														? 'cursor-pointer select-none'
														: '',
													onClick: header.column.getToggleSortingHandler(),
												}}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{{
													asc: ' 🔼',
													desc: ' 🔽',
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody
						style={{
							height: `${rowVirtualizer.getTotalSize()}px`,
						}}
					>
						{rowVirtualizer.getVirtualItems().map((virtualRow) => {
							const row = rows[virtualRow.index];
							return (
								<tr
									data-index={virtualRow.index}
									ref={node => rowVirtualizer.measureElement(node)}
									key={row.id}
									style={{
										position: 'absolute',
										transform: `translateY(${virtualRow.start}px)`,
									}}
								>
									{row.getVisibleCells().map((cell) => {
										return (
											<td
												key={cell.id}
												style={{
													width: cell.column.getSize(),
												}}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{editingRow !== null && (
				<EditModal
					isOpen
					onRequestClose={() => setEditingRow(null)}
					data={editingRow as FieldValues}
					onSave={handleSave}
				/>
			)}
		</div>
	);
};

export default DataTable;
