import axios from "axios";
import { createContext, useEffect, useReducer } from "react"
import { visitorReducer } from "../redux/reducers/visitorReducer";

export const VisitorContext = createContext();

const VisitorContextProvider = ({ children }) => {
    const [visitors, visitorDispatch] = useReducer(visitorReducer, []);

    useEffect(() => {
        axios.get("http://localhost:1000/visitors").then((res) => {
            visitorDispatch({ type: "LOAD_VISITOR", data: res.data });
        }).catch((err) => visitorDispatch({ type: "LOAD_VISITOR", data: { error: err.message } }));
    }, [])

    return (
        <VisitorContext.Provider value={{ visitors, visitorDispatch }}>
            {children}
        </VisitorContext.Provider>
    )
}

export default VisitorContextProvider
