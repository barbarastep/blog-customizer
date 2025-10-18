import { useState, useEffect, FormEvent } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type Props = {
	initial: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
	onResetToInitial: () => void;
	isOpen: boolean;
};

export const ArticleParamsForm = ({
	initial,
	onApply,
	onResetToInitial,
	isOpen,
}: Props) => {
	const [draft, setDraft] = useState<ArticleStateType>(initial);
	useEffect(() => setDraft(initial), [initial]);

	const submit = (e: FormEvent) => {
		e.preventDefault();
		onApply(draft);
	};
	const reset = () => {
		setDraft(initial);
		onResetToInitial();
	};

	return (
		<aside
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
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

				{/* RadioGroup / Select */}
				<div className={styles.bottomContainer}>
					<Button title='Сбросить' htmlType='reset' type='clear' />
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</aside>
	);
};
