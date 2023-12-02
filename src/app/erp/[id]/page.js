const ErpId = ({params})=> {
    console.log("params = ", params);

    return (
        <div>
            Welcome to Erp {params.id}
        </div>
    );
}

export default  ErpId ;
