import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect } from "react";
import { useState } from "react";
import bigDataService from "../api/bigDataService";
import { useMemo } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

const AccountGrid = () => {
	const [rowData, setRowData] = useState([]);

	const columnDefs = [
		{ headerName: "Account ID", field: "id" },
		{ headerName: "Account Owner", field: "owner" },
		{ headerName: "Account Balance", field: "balance" },
		{ headerName: "Account Currency", field: "currency" },
	];

	const defaultColDef = useMemo(() => {
		return {
			filter: "agTextColumnFilter",
			floatingFilter: true,
		};
	}, []);

	useEffect(() => {
		const handleFetchData = async () => {
			const data1 = await bigDataService();
			setRowData(data1);
		};
		handleFetchData();
	}, [])

	const handleOnGridReady = (params) => {
		params.api.sizeColumnsToFit();
	}

	console.log("push111:", rowData);

	return (
		<div style={{ height: 500 }}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				pagination={true}
				paginationPageSize={10}
				paginationPageSizeSelector={[10, 25, 50]}
				onGridReady={handleOnGridReady}
				animateRows={true}
			/>
		</div>
	);

}

export default AccountGrid