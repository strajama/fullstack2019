import React from 'react'

const Filter = (props) => {
    const { filterName , handleFilterChange } = props
    return (
    <div>rajaa näytettäviä
        <input value={filterName} onChange={handleFilterChange}/>
    </div>
    )
}

export default Filter