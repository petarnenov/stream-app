import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { SetFilterModule, MasterDetailModule } from 'ag-grid-enterprise';
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useCallback } from "react";
import { Link } from "react-router";
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
			flex: 2,
			cellDataType: 'date',
			valueGetter: ({ data }) => new Date(data.createdAt)
		},
		{
			headerName: "Message",
			field: "message",
			flex: 8,
		},
		{
			headerName: "Action",
            field: "id",
            flex: 2,
			cellRenderer: ({ data }) => (
                <Link to={`/monitoring/${data.id}`}>View Details</Link>
            ),
            valueGetter: () => 'view'
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
								flex: 1
							},
							{
								headerName: "Inner Text",
								field: "innerText",
								flex: 5,
								valueGetter: ({ data }) => data.data.innerText

							}
						],
						defaultColDef: {
							flex: 1,
						},
					},
					getDetailRowData: (params) => {
						params.successCallback(JSON.parse(params.data.stepsToReproduce).sort((a, b) => +a.step - +b.step).reverse());
					},
				}}
			/>
		</div>
	);

}


export default MonitoringGrid;


[
	{
		"id": "8ba1ae0d-9034-466c-9472-0bb7ec15505e",
		"source": "fe",
		"message": "Validation failed in PhoneGridWithJoi: \"rowData[0].id\" must be a number",
		"stepsToReproduce": "[{\"step\":\"1\",\"data\":{\"action\":\"click\",\"clickCounter\":1,\"innerText\":\"Accounts\",\"timeStamp\":104031.5}},{\"step\":\"2\",\"data\":{\"action\":\"click\",\"clickCounter\":2,\"innerText\":\"Login\",\"timeStamp\":104875.19999998808}},{\"step\":\"4\",\"data\":{\"action\":\"click\",\"clickCounter\":4,\"innerText\":\"Phones\",\"timeStamp\":106765.09999999404}},{\"step\":\"3\",\"data\":{\"action\":\"click\",\"clickCounter\":3,\"innerText\":\"Monitoring\",\"timeStamp\":105347.69999998808}}]",
		"stackTrace": "\n    at PhoneGridWithJoi\n    at div\n    at Phones (http://192.168.0.164:5173/src/pages/Phones.jsx:24:19)\n    at RenderedRoute (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:5357:26)\n    at Outlet (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:6021:26)\n    at section\n    at main\n    at ErrorBoundary (http://192.168.0.164:5173/node_modules/.vite/deps/react-error-boundary.js?v=e9c1f8f6:18:5)\n    at Home (http://192.168.0.164:5173/src/pages/Home.jsx?t=1735317626688:56:28)\n    at RenderedRoute (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:5357:26)\n    at RenderErrorBoundary (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:5316:5)\n    at DataRoutes (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:5945:3)\n    at Router (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:6030:13)\n    at RouterProvider (http://192.168.0.164:5173/node_modules/.vite/deps/react-router.js?v=e9c1f8f6:5775:3)",
		"createdAt": "2024-12-27T14:40:31.600Z"
	}
]