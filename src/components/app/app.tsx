import { useState, CSSProperties } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [applied, setApplied] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': applied.fontFamilyOption.value,
					'--font-size': applied.fontSizeOption.value,
					'--font-color': applied.fontColor.value,
					'--container-width': applied.contentWidth.value,
					'--bg-color': applied.backgroundColor.value,
				} as CSSProperties
			}>
			{/* форма настроек статьи */}
			<ArticleParamsForm
				initial={applied}
				onApply={(next) => {
					setApplied(next);
				}}
				onResetToInitial={() => {
					setApplied(defaultArticleState);
				}}
			/>

			{/* статья */}
			<Article />
		</main>
	);
};
