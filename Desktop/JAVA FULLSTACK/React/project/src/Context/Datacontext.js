import { createContext } from "react";
import useWindowSize from "../Hook/useWindowSize";

let Datacontext=createContext({})

export let Dataprovider=({children})=>{
    let {width}=useWindowSize()
    return(
        <Datacontext.Provider
        value={{
            width
        }}
        >
            {children}
        </Datacontext.Provider>
    )
}
export default Datacontext