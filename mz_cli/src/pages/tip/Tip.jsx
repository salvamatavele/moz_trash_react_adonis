import React from 'react'
import { useParams } from 'react-router-dom'

function Tip() {
    /**
     * configs
     */
    const {id} = useParams();
    return (
        <>
            {id}
        </>
    )
}

export default Tip
