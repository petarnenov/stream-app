import PropTypes from "prop-types"
import classnames from "classnames"
import { usePhonesViewModel as usePhonesViewModelDI } from '../hooks'
import PhoneGrid from '../components/PhoneGrid'

import styles from './Phones.module.scss'

const Phones = ({ usePhonesViewModel = usePhonesViewModelDI }) => {
	const { phones, createPhone, removePhone, isConnected } = usePhonesViewModel()

	return (
		<div>
			<h1>Phones {phones.length} items </h1>
			<button className={styles.createButton} onClick={() => createPhone({ brand: 'Apple', model: 'IPhone 16 pro max', price: 599 })}>Create Phone</button>
			<p className={classnames([
				styles.connectionStatus,
                isConnected? styles.connected : styles.connecting,
			])}>Connection status: {isConnected ? 'Connected' : 'Connecting'}</p>
			<PhoneGrid rowData={phones} removePhone={removePhone} />
		</div>
	)
}

Phones.propTypes = {
	usePhonesViewModel: PropTypes.func,
}

export default Phones
