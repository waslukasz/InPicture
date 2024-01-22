import { useEffect, useState } from "react";
import IPhoto from "../interfaces/IPhoto";

export default function Photo({data}: {data: IPhoto}) {
    return (
        <div className='inline-flex flex-col justify-end gap-3 p-5 bg-slate-600 rounded-md'>
            <div>{data.title}</div>
            <img src={data.thumbnailUrl} alt="Photo" />
        </div>
    );
}