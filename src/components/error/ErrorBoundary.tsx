import { Component, captureOwnerStack } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

type Props = {
	children: ReactNode;
	fallback: ReactNode;
};

type State = {
	hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error(
			error,
			info.componentStack,
			captureOwnerStack(), // not available in production
		);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback;
		}

		return this.props.children;
	}
}
