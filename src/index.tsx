import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useRef, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [applied, setApplied] = useState(defaultArticleState);
	const initialRef = useRef(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
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
					setApplied(initialRef.current);
				}}
			/>

			{/* статья */}
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
