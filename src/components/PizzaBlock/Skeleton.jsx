import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
	<ContentLoader
		speed={2}
		width={310}
		height={500}
		viewBox="0 0 310 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="150" cy="135" r="125" />
		<rect x="50" y="288" rx="10" ry="10" width="210" height="25" />
		<rect x="25" y="440" rx="15" ry="15" width="90" height="35" />
		<rect x="145" y="435" rx="20" ry="20" width="140" height="45" />
		<rect x="25" y="329" rx="10" ry="10" width="260" height="85" />
	</ContentLoader>
)

export default Skeleton

{/* <ContentLoader
		speed={2}
		width={280}
		height={465}
		viewBox="0 0 280 465"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="140" cy="145" r="125" />
		<rect x="15" y="293" rx="10" ry="10" width="250" height="25" />
		<rect x="15" y="415" rx="10" ry="10" width="90" height="35" />
		<rect x="115" y="410" rx="10" ry="10" width="150" height="45" />
		<rect x="15" y="329" rx="20" ry="20" width="250" height="69" />
	</ContentLoader> */}