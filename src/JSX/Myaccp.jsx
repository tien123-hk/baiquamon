import '../CSS/Myaccp.css'
const Myaccp =(propss)=>{
    return(
        <div className="hop">
                    <div className="service-box">
                        <div className="service-desc">
                            <img src ={propss.propssanh}></img>
                            <h4 >{propss.propsname}</h4>
                            <p>{propss.propsmota}</p>
                        </div>
                    </div>
                
            </div>
    )
 }
 export default Myaccp;