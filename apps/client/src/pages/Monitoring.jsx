import MonitoringGrid from '../components/MonitoringGrid';
import useMonitoringModel from '../hooks/useMonitoringModel';
//import styles from './Monitoring.module.scss';

const Monitoring = () => {

	const { monitoringData, clear } = useMonitoringModel()

	return (
		<>
			<h2>Monitoring Data (items:{monitoringData?.length})</h2>
			<button onClick={clear}>Clear DB</button>
			<MonitoringGrid rowData={monitoringData} />
		</>
	)
}

export default Monitoring;
