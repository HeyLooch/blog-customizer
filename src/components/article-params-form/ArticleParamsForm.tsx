import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement>(null);

	useOutsideClickClose({
		isMenuOpen,
		formRef,
		onChange: setIsMenuOpen,
	});

	const isOpenHandle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const [formState, setFormState] = useState(defaultArticleState);

	const handleSelectChange =
		(key: keyof ArticleStateType) => (value: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: value }));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={isOpenHandle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				style={{ overflow: 'hidden' }}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}
					ref={formRef}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleSelectChange('fontFamilyOption')}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'font-sizes'}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={handleSelectChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleSelectChange('fontColor')}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleSelectChange('backgroundColor')}
						title={'Цвет фона'}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleSelectChange('contentWidth')}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
