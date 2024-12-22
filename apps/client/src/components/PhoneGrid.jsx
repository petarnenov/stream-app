import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useCallback } from "react";
import withJoi from "../hoc/withJoi";
import phoneSchema from "./phoneSchema";

ModuleRegistry.registerModules([AllCommunityModule]);

// eslint-disable-next-line react/prop-types
const PhoneGrid = ({ rowData, removePhone }) => {

	const columnDefs = [
		{ headerName: "Phone Brand", field: "brand" },
		{ headerName: "Phone Model", field: "model" },
		{ headerName: "Phone Price", field: "price" },
		{
			headerName: "Actions",
			field: "actions",
			cellStyle: { display: "flex", justifyContent: "flex-end" },
			cellRenderer: ({ data }) => {
				return (
					<button onClick={() => removePhone(data.id)}>Delete</button>
				);
			}
		}
	];

	const defaultColDef = useMemo(() => {
		return {
			filter: "agTextColumnFilter",
			floatingFilter: true,
		};
	}, []);

	const handleOnGridReady = (params) => {
		params.api.sizeColumnsToFit();
	}

	const getRowId = useCallback(({ data }) => data.id, [])

	return (
		<div style={{ height: 500 }}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				// pagination={true}
				// paginationPageSize={10}
				// paginationPageSizeSelector={[10, 25, 50]}
				onGridReady={handleOnGridReady}
				animateRows={true}
				getRowId={getRowId}
			/>
		</div>
	);

}

export default withJoi(PhoneGrid, phoneSchema);
