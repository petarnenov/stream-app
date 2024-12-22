import { usePhonesViewModel as usePhonesViewModelDI } from '../hooks'
import PhoneGrid from '../components/PhoneGrid'

const Phones = ({ usePhonesViewModel = usePhonesViewModelDI }) => {
	const { phones, createPhone, removePhone } = usePhonesViewModel()

	return (
		<div>
			<h1>Phones {phones.length} items</h1>
			<button onClick={() => createPhone({ brand: 'Apple', model: 'IPhone 16 pro max', price: 599 })}>Create Phone</button>
			<PhoneGrid rowData={phones} removePhone={removePhone} />
		</div>
	)
}

export default Phones