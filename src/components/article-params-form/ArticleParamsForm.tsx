import { useState, useEffect, FormEvent } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
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

type Props = {
	initial: ArticleStateType;
	onApply: (next: ArticleStateType) => void;
	onCancel: () => void;
};

export const ArticleParamsForm = ({ initial, onApply, onCancel }: Props) => {
	const [draft, setDraft] = useState<ArticleStateType>(initial);
	useEffect(() => setDraft(initial), [initial]);

	const submit = (e: FormEvent) => { e.preventDefault(); onApply(draft); };
	const reset = () => {
		setDraft(initial);
		onApply(initial);
	};

	return (
		<aside className={styles.container} onClick={(e) => e.stopPropagation()}>
			<form className={styles.form} onSubmit={submit} onReset={reset}>
				{/* 1) Шрифт (RadioGroup): selected = OptionType, onChange -> OptionType */}
				<RadioGroup
					name="fontFamily"
					title="Семейство шрифта"
					options={fontFamilyOptions}
					selected={draft.fontFamilyOption}
					onChange={(opt: OptionType) =>
						setDraft(d => ({ ...d, fontFamilyOption: opt }))
					}
				/>

				{/* 2) Размер шрифта (Select) */}
				<Select
					title="Размер шрифта"
					options={fontSizeOptions}
					selected={draft.fontSizeOption}
					placeholder="Выберите размер"
					onChange={(opt: OptionType) =>
						setDraft(d => ({ ...d, fontSizeOption: opt }))
					}
				/>

				{/* 3) Цвет текста (Select) */}
				<Select
					title="Цвет текста"
					options={fontColors}
					selected={draft.fontColor}
					onChange={(opt: OptionType) =>
						setDraft(d => ({ ...d, fontColor: opt }))
					}
				/>

				{/* 4) Цвет фона (Select) */}
				<Select
					title="Цвет фона"
					options={backgroundColors}
					selected={draft.backgroundColor}
					onChange={(opt: OptionType) =>
						setDraft(d => ({ ...d, backgroundColor: opt }))
					}
				/>

				{/* 5) Ширина контейнера (Select) */}
				<Select
					title="Ширина контейнера"
					options={contentWidthArr}
					selected={draft.contentWidth}
					onChange={(opt: OptionType) =>
						setDraft(d => ({ ...d, contentWidth: opt }))
					}
				/>

				{/* RadioGroup / Select */}
				<div className={styles.bottomContainer}>
					<Button title="Сбросить" htmlType="reset" type="clear" />
					<Button title="Применить" htmlType="submit" type="apply" />
				</div>
			</form>
		</aside>
	);
};
