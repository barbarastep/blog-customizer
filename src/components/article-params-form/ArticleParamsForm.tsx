import { useState, useEffect, useRef, FormEvent } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { ArrowButton } from 'src/ui/arrow-button';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type Props = {
	initial: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
	onResetToInitial: () => void;
};

export const ArticleParamsForm = ({
	initial,
	onApply,
	onResetToInitial,
}: Props) => {
	const [draft, setDraft] = useState<ArticleStateType>(defaultArticleState);
	useEffect(() => setDraft(initial ?? defaultArticleState), [initial]);

	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;
		const onDocMouseDown = (e: MouseEvent) => {
			const target = e.target as Node;
			if (panelRef.current && !panelRef.current.contains(target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', onDocMouseDown);
		return () => document.removeEventListener('mousedown', onDocMouseDown);
	}, [isOpen]);

	const submit = (e: FormEvent) => {
		e.preventDefault();
		onApply(draft);
	};
	const reset = () => {
		setDraft(defaultArticleState);
		onApply(defaultArticleState);
		onResetToInitial();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((o) => !o)} />
			<aside
				ref={panelRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				aria-hidden={!isOpen}
				onClick={(e) => e.stopPropagation()}>
				<form className={styles.form} onSubmit={submit} onReset={reset}>
					{/* Заголовок */}
					<div>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					{/* 1) Шрифт (Select) */}
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={draft.fontFamilyOption}
						onChange={(opt: OptionType) =>
							setDraft((d) => ({ ...d, fontFamilyOption: opt }))
						}
					/>

					{/* 2) Размер шрифта (RadioGroup) */}
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={draft.fontSizeOption}
						onChange={(opt: OptionType) =>
							setDraft((d) => ({ ...d, fontSizeOption: opt }))
						}
					/>

					{/* 3) Цвет шрифта (Select) */}
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={draft.fontColor}
						onChange={(opt: OptionType) =>
							setDraft((d) => ({ ...d, fontColor: opt }))
						}
					/>

					{/* Разделитель */}
					<Separator />

					{/* 4) Цвет фона (Select) */}
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={draft.backgroundColor}
						onChange={(opt: OptionType) =>
							setDraft((d) => ({ ...d, backgroundColor: opt }))
						}
					/>

					{/* 5) Ширина контента (Select) */}
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={draft.contentWidth}
						onChange={(opt: OptionType) =>
							setDraft((d) => ({ ...d, contentWidth: opt }))
						}
					/>

					{/* Кнопки */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
