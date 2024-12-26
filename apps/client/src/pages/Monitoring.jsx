import MonitoringGrid from '../components/MonitoringGrid';
import useMonitoringModel from '../hooks/useMonitoringModel';
//import styles from './Monitoring.module.scss';

const Monitoring = () => {
	// eslint-disable-next-line no-unused-vars
	const { monitoringData, clear } = useMonitoringModel()

	return (
		<>
			<h2>Monitoring Data {monitoringData?.length}</h2>
			{/* <button onClick={clear}>Clear DB</button> */}
			<MonitoringGrid rowData={monitoringData} />
		</>
	)
}

export default Monitoring;
