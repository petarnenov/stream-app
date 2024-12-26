import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { SetFilterModule } from 'ag-grid-enterprise';
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useCallback } from "react";
import withJoi from "../hoc/withJoi";
import phoneGridSchema from "./phoneGridSchema";

ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule]);

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const PhoneGrid = ({ rowData, removePhone }) => {

	const columnDefs = [
		{ headerName: "Phone Brand", field: "brand" },
		{ headerName: "Phone Model", field: "model" },
		{ headerName: "Phone Price", field: "price", cellStyle: { textAlign: "right" } },
		{
			headerName: "Actions",
			field: "actions",
			cellStyle: { display: "flex", justifyContent: "flex-end" },
			cellRenderer: ({ data }) => {
				return (
					<button style={{ backgroundColor: 'pink', borderRadius: '8px', margin: '4px', cursor: 'pointer' }} onClick={() => removePhone(data.id)}>Delete</button>
				);
			},
			valueGetter: () => 'delete',
			filter: "agSetColumnFilter"
		}
	];

	const defaultColDef = useMemo(() => {
		return {
			filter: "agTextColumnFilter",
			//floatingFilter: true,
		};
	}, []);

	const handleOnGridReady = (params) => {
		params.api.sizeColumnsToFit();
	}

	const getRowId = useCallback(({ data }) => data.id, [])

	return (
		<div style={{ height: 800 }}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				paginationPageSize={20}
				paginationPageSizeSelector={[20, 25, 50]}
				onGridReady={handleOnGridReady}
				animateRows={true}
				getRowId={getRowId}
			/>
		</div>
	);

}

// eslint-disable-next-line react-refresh/only-export-components
export default withJoi(PhoneGrid, phoneGridSchema);
