import React from "react";

interface Props {
    title: string;
    textColor: string;
}

const DownloadTitle: React.FC<Props> = ({title, textColor}) => {
    return (
        <h2 className={`${textColor ? textColor : 'text-rose-500'} font-bold text-sm xl:text-xl`}>{title}</h2>
    )
}

export default DownloadTitle;
