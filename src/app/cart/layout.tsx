

export default function Cartlayout({children}:{children:React.ReactNode}){
return <div>
    <div className="flex justify-around">
        <p>step 1</p>
        <p>step 2</p>
        <p>step 3</p>
        <p>step 4</p>
    </div>
    {children}
</div>
}