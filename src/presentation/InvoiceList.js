import React, { Component } from "react";
import Invoice from "./Invoice"
import SortHeader from "./SortHeader";
import M from 'materialize-css'

class InvoiceList extends Component {
    intersectionObserver;

    constructor(props) {
        super(props);

        this.state = {
            queryPayload: {
                orderBy: 'id',
                orderByDirection: 'asc',
                limit: 11,
                startAt: -10,
            }

        }

        this.intersectionObserver = new IntersectionObserver(entries => {
            var ratio = entries[0].intersectionRatio;
            if (ratio > 0) this.props.getInvoicesNext(this.props.invoices)
        })


    }

    render() {
        console.log(this.props)
        let columns = ['id', 'campaign_id', 'campaign_name', 'line_item_name', 'booked_amount',
            'actual_amount', 'adjustments', 'Real Time Adjustments', 'Subtotal']
        return (
            <div className='invoiceList'>


                <div>
                    <p>Invoice Total: {this.props.invoices.grandTotal}</p>
                </div>
                <table className="responsive-table highlight">
                    <thead>
                        <tr>
                            {columns.map((column) =>
                                <SortHeader key={column} column={column} onClick={(orderBy, orderByDirection) => this.props.sortOnClick(orderBy, orderByDirection)}>
                                    {column}
                                </SortHeader>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.invoices.invoices && this.props.invoices.invoices.map(invoice => (
                            <Invoice key={invoice.id} invoice={invoice} updateAdjustments={(invoice, newAdjustment) => this.props.updateAdjustments(invoice, newAdjustment)}
                                onClick={() => this.props.onInvoiceClick(invoice.id)} ></Invoice>

                        ))}
                    </tbody>
                </table>
                < div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
                    Loading...
                </div>



            </div >
        )
    }

    componentDidMount() {
        console.log(this.props)
        this.props.onLoad({
            payload:
            {
                orderBy: 'id',
                orderByDirection: 'asc',
                limit: 11,
                startAt: -10,
            }
        });

        this.props.getInvoiceTotal();

        this.intersectionObserver.observe(this.loadingRef);


    }
    componentWillUnmount() {
        this.intersectionObserver.disconnect();
    }

}
export default InvoiceList
