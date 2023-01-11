import React, { useState} from 'react'
import {useSessionStorage} from "react-sessionstorage";

export default function Session() {
    const [ sessionStorages, setSessionStorage, removeSessionStorage ] = useSessionStorage(["test"]);
      const setItem = () => {
        setSessionStorage("email", "amit244245@gmail.com");
      };
    return (
        <>
            <button className='btn btn-warning' onClick={setItem}>Store data</button>
        </>
    )
}
