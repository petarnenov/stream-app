import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import monitoringService from '../api/monitoringService';

import styles from './MonitoringDetails.module.scss';

const MonitoringDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [monitoringData, setMonitoringData] = useState(null);

    useEffect(() => {
        monitoringService.getById(id).then((data) => {
            setMonitoringData(data);
        });
    }, [id]);

    if (!monitoringData) {
        return <p className={styles.loading}>Loading...</p>;
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>Back</button>
            <h2 className={styles.title}>Monitoring Details</h2>
            <p className={styles.detail}><strong>ID:</strong> {monitoringData.id}</p>
            <p className={styles.detail}><strong>Source:</strong> {monitoringData.source}</p>
            <p className={styles.detail}><strong>Message:</strong> {monitoringData.message}</p>
            <p className={styles.detail}><strong>Stack Trace:</strong></p>
            <pre className={styles.stackTrace}>{monitoringData.stackTrace}</pre>
            <p className={styles.detail}><strong>Steps to Reproduce:</strong></p>
            <pre className={styles.stepsToReproduce}>{JSON.stringify(JSON.parse(monitoringData.stepsToReproduce), null, 2)}</pre>
            <p className={styles.detail}><strong>Created At:</strong> {new Date(monitoringData.createdAt).toLocaleString()}</p>
        </div>
    );
};

export default MonitoringDetails;