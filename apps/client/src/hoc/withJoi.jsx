
const withJoi = (WrappedComponent, schema) => {
	const name = `${WrappedComponent.name || "Component"}WithJoi`;
	const WrappedComponentWithNameAndValidation = (props) => {
		const { value: validatedProps, error } = schema.validate(props)
		if (error) {
			// Log the validation errors to the console for debugging purposes.
			console.error('Validation failed:', error.details)

			// Rethrow the error to stop the execution of the wrapped component.
			//throw new Error('Validation failed', error.details)
		}
		return <WrappedComponent {...validatedProps} />
	}
	WrappedComponentWithNameAndValidation.displayName = name;

	return WrappedComponentWithNameAndValidation;
}

export default withJoi;
