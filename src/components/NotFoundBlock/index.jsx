import React from "react";

import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {

	console.log(styles)
	return (

		<div className={styles.root}>
			<h1>
				<span>😟</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={styles.description}>Данная страница отсутсвует в нашей пиццерии</p>
		</div>
	)
};

export default NotFoundBlock;