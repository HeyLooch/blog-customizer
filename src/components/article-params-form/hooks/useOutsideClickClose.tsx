import { useEffect } from 'react';

type UseOutsideClickClose = {
	isMenuOpen: boolean;
	formRef: React.RefObject<HTMLElement>;
	onChange: (newValue: boolean) => void;
};

export const useOutsideClickClose = ({
	isMenuOpen,
	formRef,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !formRef.current?.contains(target)) {
				isMenuOpen && onChange?.(false);
			}
		};

		isMenuOpen && window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen]);
};
