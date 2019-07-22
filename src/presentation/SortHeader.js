import React from 'react'
import PropTypes from 'prop-types'

const SortHeader = ({ onClick, column }) => {

    let orderByDirection = 'asc'
    return (<th key={column} onClick={() => onClick(column, orderByDirection)}>
        {column}
    </th>)



}

SortHeader.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default SortHeader
