import PropTypes from "prop-types"
import classnames from "classnames"
import { usePhonesViewModel as usePhonesViewModelDI } from '../hooks'
import PhoneGrid from '../components/PhoneGrid'
import { faker } from '@faker-js/faker'

import styles from './Phones.module.scss'

const Phones = ({ usePhonesViewModel = usePhonesViewModelDI }) => {
	const { phones, createPhone, removePhone, hasConnected } = usePhonesViewModel()

	return (
		<div>
			<h1>Phones {phones.length} items </h1>
			<button className={styles.createButton} onClick={() => createPhone({ brand: faker.company.name(), model: faker.commerce.productName(), price: faker.commerce.price() })}>Create Phone</button>
			<p className={classnames([
				styles.connectionStatus,
				hasConnected ? styles.connected : styles.connecting,
			])}>Connection status: {hasConnected ? 'Connected' : 'Connecting'}</p>
			<PhoneGrid rowData={phones} removePhone={removePhone} />
		</div>
	)
}

Phones.propTypes = {
	usePhonesViewModel: PropTypes.func,
}

export default Phones
