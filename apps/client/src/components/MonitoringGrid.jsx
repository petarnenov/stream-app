import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { SetFilterModule, MasterDetailModule } from 'ag-grid-enterprise';
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useCallback } from "react";
//import withJoi from "../hoc/withJoi";
//import phoneGridSchema from "./phoneGridSchema";

ModuleRegistry.registerModules([AllCommunityModule, SetFilterModule, MasterDetailModule,]);

// eslint-disable-next-line react/prop-types
const MonitoringGrid = ({ rowData }) => {

	const columnDefs = [
		{ headerName: "Source", field: "source", flex: 1, cellRenderer: "agGroupCellRenderer" },
		{
			headerName: "Created At",
			field: "createdAt",
			flex: 4,
			cellDataType: 'date',
			valueGetter: ({ data }) => new Date(data.createdAt)
		},
		{
			headerName: "Message",
			field: "stackTrace",
			valueGetter: ({ data }) => {
				let message = ''
				try {
					message = JSON.parse(data.stackTrace)?.message;
				} catch (error) {
					console.error("Error parsing stack trace:", error);
				}
				return message
			},
			flex: 8,
		}
	];

	const defaultColDef = useMemo(() => {
		return {
			filter: "agSetColumnFilter",
			//floatingFilter: true,
			sortable: false
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
				masterDetail={true}
				detailCellRendererParams={{
					detailGridOptions: {
						// pagination: true,
						// paginationAutoPageSize: true,
						columnDefs: [
							{
								headerName: "Step",
								field: "step",
								flex: 1,
								valueGetter: ({ data }) => {
									console.log("data:", data);
									return data.step;
								},
							},
							{
								headerName: "Inner Text",
								field: "step",
								flex: 5,
								valueGetter: ({ data }) => {
									return JSON.parse(data.data).innerText;
								},
							}
						],
						defaultColDef: {
							flex: 1,
						},
					},
					getDetailRowData: (params) => {
						params.successCallback(JSON.parse(params.data.stackTrace).stepsToReproduce.sort((a, b) => +a.step - +b.step).reverse());
					},
				}}
			/>
		</div>
	);

}


export default MonitoringGrid;
