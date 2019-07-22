import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Invoice extends Component {

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        console.log(this.props.invoice)
        console.log(event.target.value)
        this.props.updateAdjustments(this.props.invoice, event.target.value)
    }
    render() {
        let invoice = this.props.invoice
        invoice.subtotal = invoice.actual_amount + invoice.adjustments
        return (
            <tr onClick={() => this.props.onClick}>
                <td>{invoice.id}</td>
                <td>{invoice.campaign_id}</td>
                <td>{invoice.campaign_name}</td>
                <td>{invoice.line_item_name}</td>
                <td>{invoice.booked_amount}</td>
                <td>{invoice.actual_amount}</td>
                <td>
                    <label>
                        <input type="text" name="adjustments" defaultValue={invoice.adjustments}
                            onChange={this.handleChange}
                        />
                    </label>
                </td>
                <td>{invoice.adjustments}</td>
                <td>{invoice.subtotal}</td>
            </tr>
        )
    }
}
// const Invoice = ({ onClick, invoice }) => {
//     invoice.subtotal = invoice.actual_amount + invoice.adjustments
//     return <li onClick={onClick}>
//         <ul>
//             <li>{invoice.id}</li>
//             <li>{invoice.campaign_id}</li>
//             <li>{invoice.campaign_name}</li>
//             <li>{invoice.line_item_name}</li>
//             <li>{invoice.booked_amount}</li>
//             <li>{invoice.actual_amount}</li>
//             <li>{invoice.adjustments}</li>
//             <li>{invoice.subtotal}</li>
//         </ul>
//     </li>

// }

// Invoice.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     invoice: PropTypes.object.isRequired
// }

export default Invoice
