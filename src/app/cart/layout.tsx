

export default function Cartlayout({children}:{children:React.ReactNode}){
return <div>
    <div className="flex justify-around">
        <p>مرحله 1</p>
        <p>مرحله 2</p>
        <p>مرحله 3</p>
        <p>مرحله 4</p>
    </div>
    {children}
</div>
}