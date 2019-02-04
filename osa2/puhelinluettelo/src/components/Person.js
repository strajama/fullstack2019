import React from 'react'

const Person = (props) => {
    const { name, number } = props
    return (
        <li>{name} {number}</li>
    )
}

export default Person