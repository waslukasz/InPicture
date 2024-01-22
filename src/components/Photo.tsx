import IPhoto from "../interfaces/IPhoto";

export default function Photo({data}: {data: IPhoto}) {
    return (
        <div className='inline-flex flex-col gap-3 p-5 bg-slate-700 m-2 rounded-md'>
            <img src={data.thumbnailUrl} alt="Photo" />
            <div className="italic text-center">{data.title}</div>
        </div>
    );
}