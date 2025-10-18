import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useRef, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './ui/arrow-button';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [applied, setApplied] = useState(defaultArticleState);
	const initialRef = useRef(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			onClick={() => isOpen && setIsOpen(false)} // закрытие по клику вне панели
			style={
				{
					'--font-family': applied.fontFamilyOption.value,
					'--font-size': applied.fontSizeOption.value,
					'--font-color': applied.fontColor.value,
					'--container-width': applied.contentWidth.value,
					'--bg-color': applied.backgroundColor.value,
				} as CSSProperties
			}>
			{/* кнопка для открытия панели */}
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

			{/* форма с настройками статьи, появляется при нажатии на кнопку */}
			{isOpen && (
				<ArticleParamsForm
					isOpen={isOpen}
					initial={applied}
					onApply={(next) => {
						setApplied(next);
						setIsOpen(false);
					}}
					onResetToInitial={() => {
						setApplied(initialRef.current);
						setIsOpen(false);
					}}
				/>
			)}

			{/* сама статья */}
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
