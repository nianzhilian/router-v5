import React from 'react'

export default function StudentDetail(props){
    console.log(props)
    return (
        <div>
            详情:{props.match.params.packType == 1?'线下':'线上'}
        </div>
    )
}