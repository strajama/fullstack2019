import React from 'react'

const Filter = (props) => {
    const { filterName , handleFilterChange } = props
    return (
    <form method="post">
    <div>
        rajaa näytettäviä 
        <input value={filterName} onChange={handleFilterChange}/>
    </div>
    </form>
    )
}

export default Filter