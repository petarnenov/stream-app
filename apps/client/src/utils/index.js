export const stepsToReproducePredicate = (stepA, stepB) => {
	return Number(stepB.step) - Number(stepA.step);
}
