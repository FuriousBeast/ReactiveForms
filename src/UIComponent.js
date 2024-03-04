
const handleChange = (e, setUseState) => {
    const { name, value } = e.target;
    console.log("name",name)
    console.log("value",value)
    setUseState(prevEntry =>
    {
        console.log(prevEntry)
         return { ...prevEntry, [name]: value };
    })



};
const renderComponent = (list, setUseState) =>
{

    let newList=  []

   list.forEach((item , index) =>{
        newList.push(<div key={index} className="row">
           {/* <div className="col-5">
                <label>{item.label}</label>
            </div>
            <div className='col-2'>
                :
            </div>*/}
            <div className={"col-12 inputsPanel " +item.name+"parent"}>
                <input type={item.type}
                       className={item.name}
                       placeholder={item.label}
                       name={item.name}
                    onChange={(e) => handleChange(e, setUseState)} />

            </div>
            {
                item.name === "searchItem" ? <div className="searchBarIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </div> : ""
            }
        </div>)

   });
    return newList
}


export {renderComponent};