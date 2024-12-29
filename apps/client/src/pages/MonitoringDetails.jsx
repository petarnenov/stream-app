import useMonitoringDetailsViewModelDI from '../hooks/useMonitoringDetailsViewModel';

import { stepsToReproducePredicate } from '../utils';

import styles from './MonitoringDetails.module.scss';

// eslint-disable-next-line react/prop-types
const MonitoringDetails = ({ useMonitoringDetailsViewModel = useMonitoringDetailsViewModelDI }) => {
    const { monitoringData, handleBack } = useMonitoringDetailsViewModel();

    if (!monitoringData) {
        return <p className={styles.loading}>Loading...</p>;
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={handleBack}>Back</button>
            <h2 className={styles.title}>Monitoring Details</h2>
            <p className={styles.detail}><strong>ID:</strong> {monitoringData.id}</p>
            <p className={styles.detail}><strong>Source:</strong> {monitoringData.source}</p>
            <p className={styles.detail}><strong>Message:</strong> {monitoringData.message}</p>
            <p className={styles.detail}><strong>Stack Trace:</strong></p>
            <pre className={styles.stackTrace}>{monitoringData.stackTrace}</pre>
            <p className={styles.detail}><strong>Steps to Reproduce:</strong></p>
            <pre className={styles.stepsToReproduce}>{JSON.stringify(JSON.parse(monitoringData.stepsToReproduce).sort(stepsToReproducePredicate), null, 2)}</pre>
            <p className={styles.detail}><strong>Created At:</strong> {new Date(monitoringData.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default MonitoringDetails;