
const withJoi = (WrappedComponent, schema) => {
	const name = `${WrappedComponent.name || "Component"}WithJoi`;
	const WrappedComponentWithNameAndValidation = (props) => {
		const { value: validatedProps, error } = schema.validate(props)
		if (error) {
			// Log the validation errors to the console for debugging purposes.
			console.error('Validation failed ----------- :', error)

			// Rethrow the error to stop the execution of the wrapped component.
			const errorDetails = error.details.map(detail => detail.message).join(', ');
			throw new Error(`Validation failed in ${name}: ${errorDetails}`)
		}

		return <WrappedComponent {...validatedProps} />
	}
	WrappedComponentWithNameAndValidation.displayName = name;

	return WrappedComponentWithNameAndValidation;
}

export default withJoi;
